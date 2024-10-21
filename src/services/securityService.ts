import prisma from "../prismaClient";
import { TopSecuritiesDto } from "../dtos";

export const getTopSecurities = async (
  top: number = 10
): Promise<TopSecuritiesDto[]> => {
  const result = await prisma.$queryRaw<TopSecuritiesDto[]>`
      SELECT s.ticker, s.name, SUM(h.units) AS total_units
      FROM "Holding" h
      JOIN "Security" s ON h."securityId" = s.id
      GROUP BY s.ticker, s.name
      ORDER BY total_units DESC
      LIMIT ${top}
    `;

  return result;
};
