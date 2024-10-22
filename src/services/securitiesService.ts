import prisma from "../prismaClient";
import { MostHeldSecuritiesDto } from "../dtos";

export const getMostHeldSecurities = async (
  top: number = 10
): Promise<MostHeldSecuritiesDto[]> => {
  const result = await prisma.$queryRaw<MostHeldSecuritiesDto[]>`
    SELECT s.ticker, s.name, SUM(h.units) AS total_units
    FROM "Holding" h
    JOIN "Security" s ON h."securityId" = s.id
    GROUP BY s.ticker, s.name
    ORDER BY total_units DESC
    LIMIT ${top}
  `;

  return result;
};
