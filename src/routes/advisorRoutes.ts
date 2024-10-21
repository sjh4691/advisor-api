import { Router } from "express";
import {
  getAum,
  getAumByAdvisorId,
  getAdvisors,
} from "../controllers/advisorController";

const router = Router();
/**
 * @swagger
 * /advisors:
 *   get:
 *     summary: Retrieve a list of advisors
 *     responses:
 *       200:
 *         description: A list of advisors
 */
router.get("/", getAdvisors);

/**
 * @swagger
 * /advisors/aum:
 *   get:
 *     summary: Retrieve the AUM
 *     responses:
 *       200:
 *         description: AUM data
 */
router.get("/aum", getAum);

/**
 * @swagger
 * /advisors/aum/{advisorId}:
 *   get:
 *     summary: Retrieve the AUM by advisor ID
 *     parameters:
 *       - in: path
 *         name: advisorId
 *         required: true
 *         description: ID of the advisor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AUM data for the specified advisor
 */
router.get("/aum/:advisorId", getAumByAdvisorId);

export default router;
