import { Router } from "express";

const router = Router();

router.get("/health", (_req: any, res: any) => {
  res.status(200).send({
    ok: true,
    status: "healthy",
  });
});

export default router;