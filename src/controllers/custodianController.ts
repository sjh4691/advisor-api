import { Request, Response } from "express";
import { getTotalCustodianAum as fetchTotalCustodianAum } from "../services/custodianService";

export const getTotalCustodianAum = async (req: Request, res: Response) => {
  try {
    const custodianAssets = await fetchTotalCustodianAum();
    res.json(custodianAssets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch custodian advisor assets" });
  }
};
