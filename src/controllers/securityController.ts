import { Request, Response } from "express";
import { getTopSecurities } from "../services/securityService";
import { TopSecuritiesDto } from "../dtos";

export const getTopSecuritiesHeld = async (req: Request, res: Response) => {
  try {
    const top = req.query.top ? parseInt(req.query.top as string, 10) : 10;
    const topSecurities: TopSecuritiesDto[] = await getTopSecurities(top);
    res.json(topSecurities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top securities" });
  }
};
