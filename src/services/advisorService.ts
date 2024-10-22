import prisma from "../prismaClient";
import { AdvisorAumDto, AdvisorDto, AdvisorWithClientsDto } from "../dtos";

export const getAllAdvisors = async (): Promise<AdvisorDto[]> => {
  const result = await prisma.advisor.findMany();
  return result.map((advisor) => ({
    id: advisor.id,
    name: advisor.name,
  }));
};

export const getAumByAdvisor = async (
  advisorId: number
): Promise<AdvisorAumDto> => {
  const result = await prisma.$queryRaw<{ advisor_aum: number }[]>`
    SELECT SUM(h.units * s.price) AS advisor_aum
    FROM "Holding" h
    JOIN "Security" s ON h."securityId" = s.id
    JOIN "Account" a ON h."accountId" = a.id
    JOIN "Client" c ON a."clientId" = c.id
    WHERE c."advisorId" = ${advisorId}
  `;
  return { advisor_aum: result[0]?.advisor_aum || 0 };
};

export const getAdvisorSummary = async (): Promise<AdvisorWithClientsDto[]> => {
  const result = await prisma.$queryRaw<
    {
      advisor_id: number;
      advisor_name: string;
      client_id: number;
      client_name: string;
      client_aum: number;
    }[]
  >`
    SELECT 
      a.id AS advisor_id,
      a.name AS advisor_name,
      c.id AS client_id,
      c.name AS client_name,
      COALESCE(SUM(h.units * s.price), 0) AS client_aum
    FROM "Advisor" a
    JOIN "Client" c ON a.id = c."advisorId"
    LEFT JOIN "Account" acc ON c.id = acc."clientId"
    LEFT JOIN "Holding" h ON acc.id = h."accountId"
    LEFT JOIN "Security" s ON h."securityId" = s.id
    GROUP BY a.id, a.name, c.id, c.name
    ORDER BY a.id, c.id
  `;

  const advisorsMap: { [key: number]: AdvisorWithClientsDto } = {};

  result.forEach((row) => {
    if (!advisorsMap[row.advisor_id]) {
      advisorsMap[row.advisor_id] = {
        advisor_id: row.advisor_id,
        advisor_name: row.advisor_name,
        clients: [],
      };
    }

    advisorsMap[row.advisor_id].clients.push({
      id: row.client_id,
      name: row.client_name,
      aum: row.client_aum,
    });
  });

  Object.values(advisorsMap).forEach((advisor) => {
    advisor.clients.sort((a, b) => b.aum - a.aum);
  });

  return Object.values(advisorsMap);
};
