import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiriesRouter from "./inquiries";
import googleReviewsRouter from "./google-reviews";
import portfolioRouter from "./portfolio";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(googleReviewsRouter);
router.use(portfolioRouter);
router.use(storageRouter);

export default router;
