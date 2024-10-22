import prisma from "../prismaClient";

export const getTotalManagedAum = async (): Promise<number> => {
  const result = await prisma.$queryRaw<{ total_aum: number }[]>`
        SELECT SUM(h.units * s.price) AS total_aum
        FROM "Holding" h
        JOIN "Security" s ON h."securityId" = s.id
      `;
  return result[0]?.total_aum || 0;
};
