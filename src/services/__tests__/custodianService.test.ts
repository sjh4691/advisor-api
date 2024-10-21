import { getTopSecurities } from "../securityService";
import prisma from "../../prismaClient";

jest.mock("../../prismaClient", () => ({
  $queryRaw: jest.fn(),
}));

describe("Securities Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return top securities", async () => {
    const mockSecurities = [
      { id: 1, name: "Security 1", price: 100 },
      { id: 2, name: "Security 2", price: 200 },
    ];
    (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockSecurities);

    const securities = await getTopSecurities();
    expect(securities).toEqual(mockSecurities);
  });

  it("should handle no securities found", async () => {
    (prisma.$queryRaw as jest.Mock).mockResolvedValue([]);

    const securities = await getTopSecurities();
    expect(securities).toEqual([]);
  });

  it("should handle errors", async () => {
    (prisma.$queryRaw as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getTopSecurities()).rejects.toThrow("Database error");
  });
});
