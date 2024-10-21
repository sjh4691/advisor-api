import { Router } from "express";
import { getTopSecuritiesHeld } from "../controllers/securityController";

const router = Router();

/**
 * @swagger
 * /securities/top-securities:
 *   get:
 *     summary: Retrieve the top securities held
 *     responses:
 *       200:
 *         description: A list of top securities
 */
router.get("/top-securities", getTopSecuritiesHeld);

export default router;
