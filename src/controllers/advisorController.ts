import { Request, Response } from "express";
import {
  getTotalAum,
  getAumByAdvisor,
  getAllAdvisors,
} from "../services/advisorService";

export const getAdvisors = async (req: Request, res: Response) => {
  try {
    const advisors = await getAllAdvisors();
    res.json(advisors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch advisors" });
  }
};

export const getAum = async (req: Request, res: Response) => {
  try {
    const totalAUM = await getTotalAum();
    res.json(totalAUM);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch total AUM" });
  }
};

export const getAumByAdvisorId = async (req: Request, res: Response) => {
  const advisorId = Number(req.params.advisorId);
  try {
    const advisorAUM = await getAumByAdvisor(advisorId);
    res.json(advisorAUM);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch advisor AUM" });
  }
};
