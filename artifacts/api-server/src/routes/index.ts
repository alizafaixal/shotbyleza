import { Router } from "express";
import healthRouter from "./health.js";
import inquiriesRouter from "./inquiries.js";
import googleReviewsRouter from "./google-reviews.js";
import portfolioRouter from "./portfolio.js";
import storageRouter from "./storage.js";
import siteSettingsRouter from "./site-settings.js";

const router = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(googleReviewsRouter);
router.use(portfolioRouter);
router.use(storageRouter);
router.use(siteSettingsRouter);

export default router;
