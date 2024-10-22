import { Router } from "express";
import { getTotalManagedAum } from "../controllers/statsController";

const router = Router();

/**
 * @swagger
 * /stats/total-aum:
 *   get:
 *     summary: Retrieve total AUM across all clients
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Total dollar amount of assets under management
 */
router.get("/total-aum", getTotalManagedAum);

export default router;
