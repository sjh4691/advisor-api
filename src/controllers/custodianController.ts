import { Request, Response } from "express";
import { getCustodianAdvisorAssets } from "../services/custodianService";
import { CustodianAdvisorDto } from "../dtos";

export const getCustodianAdvisorAssetsList = async (
  req: Request,
  res: Response
) => {
  try {
    const custodianAssets: CustodianAdvisorDto[] =
      await getCustodianAdvisorAssets();
    res.json(custodianAssets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch custodian advisor assets" });
  }
};
