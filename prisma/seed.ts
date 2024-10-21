import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const security1 = await prisma.security.create({
    data: {
      ticker: "AAPL",
      name: "Apple Inc.",
      price: 236.48,
      isin: "US0378331005",
      cusip: "037833100",
    },
  });

  const security2 = await prisma.security.create({
    data: {
      ticker: "GOOG",
      name: "Alphabet Inc.",
      price: 165.8,
      isin: "US02079K1079",
      cusip: "02079K107",
    },
  });

  const security3 = await prisma.security.create({
    data: {
      ticker: "TSLA",
      name: "Tesla Inc.",
      price: 218.85,
      isin: "US88160R1014",
      cusip: "88160R101",
    },
  });

  const custodian1 = await prisma.custodian.create({
    data: {
      name: "Fidelity",
      repId: "fid123",
    },
  });

  const custodian2 = await prisma.custodian.create({
    data: {
      name: "Pershing",
      repId: "per456",
    },
  });

  const advisor1 = await prisma.advisor.create({
    data: {
      name: "John Doe",
    },
  });

  const advisor2 = await prisma.advisor.create({
    data: {
      name: "Jane Doe",
    },
  });

  const client1 = await prisma.client.create({
    data: {
      name: "Client 1",
      advisor: {
        connect: { id: advisor1.id },
      },
      accounts: {
        create: [
          {
            name: "Client 1 IRA",
            number: "ret12345",
            repId: "rep9875",
            accountType: "retirement",
            custodian: {
              connect: { id: custodian1.id },
            },
            holdings: {
              create: [
                {
                  units: 50,
                  purchaseDate: new Date("2024-01-01"),
                  security: {
                    connect: { id: security1.id },
                  },
                },
                {
                  units: 15,
                  purchaseDate: new Date("2023-02-01"),
                  security: {
                    connect: { id: security3.id },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "Client 2",
      advisor: {
        connect: { id: advisor1.id },
      },
      accounts: {
        create: [
          {
            name: "Client 2 Individual - TOD",
            number: "ind12345",
            repId: "rep6543",
            accountType: "brokerage",
            custodian: {
              connect: { id: custodian2.id },
            },
            holdings: {
              create: [
                {
                  units: 20,
                  purchaseDate: new Date("2023-05-15"),
                  security: {
                    connect: { id: security2.id },
                  },
                },
                {
                  units: 10,
                  purchaseDate: new Date("2023-08-15"),
                  security: {
                    connect: { id: security3.id },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const client3 = await prisma.client.create({
    data: {
      name: "Client 3",
      advisor: {
        connect: { id: advisor2.id },
      },
      accounts: {
        create: [
          {
            name: "Client 3 JTWROS",
            number: "jtwros",
            repId: "rep4321",
            accountType: "brokerage",
            custodian: {
              connect: { id: custodian2.id },
            },
            holdings: {
              create: [
                {
                  units: 30,
                  purchaseDate: new Date("2024-10-01"),
                  security: {
                    connect: { id: security3.id },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
