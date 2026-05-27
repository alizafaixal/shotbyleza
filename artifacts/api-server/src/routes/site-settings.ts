import { Router, type Request, type Response, type NextFunction } from "express";
import { db, siteSettingsTable } from "@workspace/db";

const router = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) { res.status(503).json({ error: "ADMIN_SECRET not configured." }); return; }
  if (req.headers.authorization !== `Bearer ${secret}`) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/site-settings", async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(siteSettingsTable);
    const out: Record<string, string> = {};
    for (const r of rows) out[r.key] = r.value;
    res.json(out);
  } catch {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.patch("/site-settings", requireAdmin, async (req: Request, res: Response) => {
  const { key, value } = req.body as { key?: string; value?: string };
  if (!key || value === undefined) { res.status(400).json({ error: "key and value required" }); return; }
  try {
    const [row] = await db
      .insert(siteSettingsTable)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value, updatedAt: new Date() } })
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to update setting" });
  }
});

export default router;
