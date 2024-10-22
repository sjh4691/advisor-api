import { Request, Response } from "express";
import { getMostHeldSecurities } from "../services/securitiesService";

export const getTopSecuritiesHeld = async (req: Request, res: Response) => {
  try {
    const top = req.query.top ? parseInt(req.query.top as string, 10) : 10;
    const topSecurities = await getMostHeldSecurities(top);
    res.json(topSecurities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top securities" });
  }
};
