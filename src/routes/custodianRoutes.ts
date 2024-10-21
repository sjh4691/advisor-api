import { Router } from "express";
import { getCustodianAdvisorAssetsList } from "../controllers/custodianController";

const router = Router();

/**
 * @swagger
 * /custodians/advisor-assets:
 *   get:
 *     summary: Retrieve a list of custodian advisor assets
 *     responses:
 *       200:
 *         description: A list of custodian advisor assets
 */
router.get("/advisor-assets", getCustodianAdvisorAssetsList);

export default router;
