import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { db, portfolioOverridesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import multer from "multer";
import { objectStorageClient } from "../lib/objectStorage";

const router = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) { res.status(503).json({ error: "ADMIN_SECRET not configured." }); return; }
  if (req.headers.authorization !== `Bearer ${secret}`) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

// Static portfolio catalog (mirrors Portfolio.tsx categories)
const CATEGORIES = [
  { label: "Model Portfolio", folder: "model", count: 29 },
  { label: "Event", folder: "events", count: 27 },
  { label: "Fashion & E-Commerce", folder: "fashion", count: 46 },
  { label: "Club", folder: "club", count: 59 },
  { label: "Portraits", folder: "portraits", count: 12 },
];

const STATIC_IMAGES = CATEGORIES.flatMap(({ label, folder, count }) =>
  Array.from({ length: count }, (_, i) => ({
    imagePath: `${folder}/${i + 1}.webp`,
    category: label,
    staticSrc: `/assets/images/${folder}/${i + 1}.webp`,
  }))
);

// GET /api/portfolio/images — public (used by frontend)
router.get("/portfolio/images", async (_req: Request, res: Response) => {
  try {
    const overrides = await db.select().from(portfolioOverridesTable);
    const overrideMap = new Map(overrides.map((o) => [o.imagePath, o]));

    const images = STATIC_IMAGES.map((img) => {
      const override = overrideMap.get(img.imagePath);
      return {
        imagePath: img.imagePath,
        category: img.category,
        src: override?.storagePath ?? img.staticSrc,
        customTitle: override?.customTitle ?? null,
        caption: override?.caption ?? null,
        hidden: override?.hidden ?? false,
        sortOrder: override?.sortOrder ?? null,
        overrideId: override?.id ?? null,
      };
    });

    res.json(images);
  } catch {
    res.status(500).json({ error: "Failed to fetch portfolio images" });
  }
});

// PATCH /api/portfolio/images/:path — admin only, update override
router.patch("/portfolio/images/*imagePath", requireAdmin, async (req: Request, res: Response) => {
  const imagePath = req.params.imagePath as string;
  const { customTitle, caption, hidden, sortOrder } = req.body as {
    customTitle?: string;
    caption?: string;
    hidden?: boolean;
    sortOrder?: number;
  };

  try {
    const existing = await db
      .select()
      .from(portfolioOverridesTable)
      .where(eq(portfolioOverridesTable.imagePath, imagePath));

    const staticImg = STATIC_IMAGES.find((i) => i.imagePath === imagePath);
    if (!staticImg && !existing.length) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    if (existing.length) {
      const [updated] = await db
        .update(portfolioOverridesTable)
        .set({
          ...(customTitle !== undefined && { customTitle }),
          ...(caption !== undefined && { caption }),
          ...(hidden !== undefined && { hidden }),
          ...(sortOrder !== undefined && { sortOrder }),
          updatedAt: new Date(),
        })
        .where(eq(portfolioOverridesTable.imagePath, imagePath))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(portfolioOverridesTable)
        .values({
          imagePath,
          category: staticImg!.category,
          customTitle: customTitle ?? null,
          caption: caption ?? null,
          hidden: hidden ?? false,
          sortOrder: sortOrder ?? null,
        })
        .returning();
      res.json(created);
    }
  } catch {
    res.status(500).json({ error: "Failed to update image override" });
  }
});

// POST /api/portfolio/upload — admin only, upload new image to object storage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

router.post("/portfolio/upload", requireAdmin, upload.single("file"), async (req: Request, res: Response) => {
  const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
  if (!bucketId) {
    res.status(503).json({ error: "Object storage not configured. Set DEFAULT_OBJECT_STORAGE_BUCKET_ID." });
    return;
  }
  const file = (req as Request & { file?: Express.Multer.File }).file;
  if (!file) { res.status(400).json({ error: "No file provided" }); return; }

  const ext = file.originalname.split(".").pop() ?? "webp";
  const storageName = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  try {
    const bucket = objectStorageClient.bucket(bucketId);
    const gcsFile = bucket.file(storageName);
    await gcsFile.save(file.buffer, { contentType: file.mimetype });
    await gcsFile.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucketId}/${storageName}`;
    res.json({ storagePath: publicUrl, storageName });
  } catch (err) {
    res.status(500).json({ error: "Upload to object storage failed" });
  }
});

export default router;
