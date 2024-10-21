import { Router } from "express";
import advisorRoutes from "./advisorRoutes";
import securityRoutes from "./securityRoutes";
import custodianRoutes from "./custodianRoutes";

const router = Router();

router.use("/advisors", advisorRoutes);
router.use("/securities", securityRoutes);
router.use("/custodians", custodianRoutes);

export default router;
