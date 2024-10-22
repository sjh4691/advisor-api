import prisma from "../prismaClient";
import { CustodianAdvisorDto } from "../dtos";

export const getCustodianAdvisorAssets = async (): Promise<
  CustodianAdvisorDto[]
> => {
  const result = await prisma.$queryRaw<CustodianAdvisorDto[]>`
    SELECT c.name AS custodian_name, a.name AS advisor_name, SUM(h.units * s.price) AS total_aum
    FROM "Account" acc
    JOIN "Client" cli ON acc."clientId" = cli.id
    JOIN "Advisor" a ON cli."advisorId" = a.id
    JOIN "Custodian" c ON acc."custodianId" = c.id
    JOIN "Holding" h ON acc.id = h."accountId"
    JOIN "Security" s ON h."securityId" = s.id
    GROUP BY c.name, a.name
    ORDER BY c.name ASC, total_aum DESC
  `;

  return result;
};
