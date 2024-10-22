import { Router } from "express";
import advisorRoutes from "./advisorRoutes";
import statsRoutes from "./securitiesRoutes";
import custodianRoutes from "./custodianRoutes";
import securitiesRoutes from "./securitiesRoutes";

const router = Router();

router.use("/advisors", advisorRoutes);
router.use("/stats", statsRoutes);
router.use("/custodians", custodianRoutes);
router.use("/securities", securitiesRoutes);

export default router;
