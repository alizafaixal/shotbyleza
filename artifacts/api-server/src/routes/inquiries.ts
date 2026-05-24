import { Router, type IRouter } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateInquiryBody, UpdateInquiryStatusBody, UpdateInquiryStatusParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/inquiries", async (_req, res) => {
  const rows = await db
    .select()
    .from(inquiriesTable)
    .orderBy(inquiriesTable.createdAt);
  res.json(rows.reverse());
});

router.post("/inquiries", async (req, res) => {
  const body = CreateInquiryBody.parse(req.body);
  const [inquiry] = await db
    .insert(inquiriesTable)
    .values({
      name: body.name,
      email: body.email,
      instagram: body.instagram,
      shootType: body.shootType,
      message: body.message,
      pageSource: body.pageSource,
      referrer: body.referrer,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
    })
    .returning();
  res.status(201).json(inquiry);
});

router.patch("/inquiries/:id", async (req, res) => {
  const { id } = UpdateInquiryStatusParams.parse({ id: Number(req.params.id) });
  const body = UpdateInquiryStatusBody.parse(req.body);
  const [inquiry] = await db
    .update(inquiriesTable)
    .set({ status: body.status })
    .where(eq(inquiriesTable.id, id))
    .returning();
  if (!inquiry) {
    res.status(404).json({ error: "Inquiry not found" });
    return;
  }
  res.json(inquiry);
});

export default router;
