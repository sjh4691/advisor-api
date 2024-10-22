import prisma from "../prismaClient";
import { CustodianAumDto } from "../dtos";

export const getTotalCustodianAum = async (): Promise<CustodianAumDto[]> => {
  const result = await prisma.$queryRaw<CustodianAumDto[]>`
    SELECT c.name AS custodian_name, SUM(h.units * s.price) AS total_aum
    FROM "Account" acc
    JOIN "Custodian" c ON acc."custodianId" = c.id
    JOIN "Holding" h ON acc.id = h."accountId"
    JOIN "Security" s ON h."securityId" = s.id
    GROUP BY c.name
    ORDER BY total_aum DESC
  `;

  return result;
};
