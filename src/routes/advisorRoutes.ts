import { Router } from "express";
import {
  getAumByAdvisorId,
  getAdvisors,
  getAdvisorSummary,
} from "../controllers/advisorController";

const router = Router();

/**
 * @swagger
 * /advisors:
 *   get:
 *     summary: Retrieve a list of all advisors
 *     tags: [Advisor]
 *     responses:
 *       200:
 *         description: A list of advisors
 */
router.get("/", getAdvisors);

/**
 * @swagger
 * /advisors/aum/{advisorId}:
 *   get:
 *     summary: Retrieve the total AUM by advisor ID
 *     parameters:
 *       - in: path
 *         name: advisorId
 *         required: true
 *         description: ID of the advisor
 *         schema:
 *           type: string
 *     tags: [Advisor]
 *     responses:
 *       200:
 *         description: AUM data for the specified advisor
 */
router.get("/aum/:advisorId", getAumByAdvisorId);

/**
 * @swagger
 * /advisors/summary:
 *   get:
 *     summary: Retrieve a summary of advisors and their clients
 *     tags: [Advisor]
 *     responses:
 *       200:
 *         description: A summary of advisors and their clients
 */
router.get("/summary", getAdvisorSummary);

export default router;
