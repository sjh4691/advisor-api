import {
  getAllAdvisors,
  getTotalAum,
  getAumByAdvisor,
} from "../advisorService";
import prisma from "../../prismaClient";

jest.mock("../../prismaClient", () => ({
  advisor: {
    findMany: jest.fn(),
  },
  $queryRaw: jest.fn(),
}));

describe("Advisor Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all advisors", async () => {
    const mockAdvisors = [
      { id: 1, name: "Advisor 1" },
      { id: 2, name: "Advisor 2" },
    ];
    (prisma.advisor.findMany as jest.Mock).mockResolvedValue(mockAdvisors);

    const advisors = await getAllAdvisors();
    expect(advisors).toEqual(mockAdvisors);
  });

  it("should return total AUM", async () => {
    const mockResult = [{ total_aum: 1000 }];
    (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockResult);

    const totalAum = await getTotalAum();
    expect(totalAum).toEqual({ total_aum: 1000 });
  });

  it("should return AUM by advisor", async () => {
    const advisorId = 1;
    const mockResult = [{ advisor_aum: 500 }];
    (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockResult);

    const advisorAum = await getAumByAdvisor(advisorId);
    expect(advisorAum).toEqual({ advisor_aum: 500 });
  });

  it("should handle no advisors found", async () => {
    (prisma.advisor.findMany as jest.Mock).mockResolvedValue([]);

    const advisors = await getAllAdvisors();
    expect(advisors).toEqual([]);
  });

  it("should handle no total AUM found", async () => {
    (prisma.$queryRaw as jest.Mock).mockResolvedValue([{ total_aum: null }]);

    const totalAum = await getTotalAum();
    expect(totalAum).toEqual({ total_aum: 0 });
  });

  it("should handle no AUM by advisor found", async () => {
    const advisorId = 1;
    (prisma.$queryRaw as jest.Mock).mockResolvedValue([{ advisor_aum: null }]);

    const advisorAum = await getAumByAdvisor(advisorId);
    expect(advisorAum).toEqual({ advisor_aum: 0 });
  });

  it("should handle errors in getAllAdvisors", async () => {
    (prisma.advisor.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getAllAdvisors()).rejects.toThrow("Database error");
  });

  it("should handle errors in getTotalAum", async () => {
    (prisma.$queryRaw as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getTotalAum()).rejects.toThrow("Database error");
  });

  it("should handle errors in getAumByAdvisor", async () => {
    const advisorId = 1;
    (prisma.$queryRaw as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getAumByAdvisor(advisorId)).rejects.toThrow("Database error");
  });
});
