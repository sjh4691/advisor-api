import { Router } from "express";
import { getTopSecuritiesHeld } from "../controllers/securitiesController";

const router = Router();

/**
 * @swagger
 * /securities/top:
 *   get:
 *     summary: Retrieve the most held securities
 *     tags: [Securities]
 *     responses:
 *       200:
 *         description: A list of most held securities
 */
router.get("/top", getTopSecuritiesHeld);

export default router;
