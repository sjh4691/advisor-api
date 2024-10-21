import prisma from "../prismaClient";
import { TotalAumDto, AdvisorAumDto, AdvisorDto } from "../dtos";

export const getAllAdvisors = async (): Promise<AdvisorDto[]> => {
  const result = await prisma.advisor.findMany();
  return result.map((advisor) => ({
    id: advisor.id,
    name: advisor.name,
  }));
};

// TODO - can these be written with Prisma, but avoid N+1 problem and overfetching?
export const getTotalAum = async (): Promise<TotalAumDto> => {
  const result = await prisma.$queryRaw<{ total_aum: number }[]>`
    SELECT SUM(h.units * s.price) AS total_aum
    FROM "Holding" h
    JOIN "Security" s ON h."securityId" = s.id
  `;
  return { total_aum: result[0]?.total_aum || 0 };
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
