import { Request, Response } from "express";
import {
  getAumByAdvisor,
  getAllAdvisors,
  getAdvisorSummary as fetchAdvisorSummary,
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

export const getAdvisorSummary = async (req: Request, res: Response) => {
  try {
    const advisorSummary = await fetchAdvisorSummary();
    res.json(advisorSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch advisor summary" });
  }
};
