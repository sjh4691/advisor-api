import { Router } from "express";
import { getTotalCustodianAum } from "../controllers/custodianController";

const router = Router();

/**
 * @swagger
 * /custodians/aum:
 *   get:
 *     summary: Retrieve a list of custodians and their total AUM across all advisors
 *     tags: [Custodian]
 *     responses:
 *       200:
 *         description: A list of custodians and their AUM across all advisors
 */
router.get("/aum", getTotalCustodianAum);

export default router;
