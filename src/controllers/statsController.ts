import { Request, Response } from "express";
import { getTotalManagedAum as fetchTotalManagedAum } from "../services/statsService";

export const getTotalManagedAum = async (req: Request, res: Response) => {
  try {
    const totalAUM = await fetchTotalManagedAum();
    res.json(totalAUM);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch total AUM for all advisors" });
  }
};
