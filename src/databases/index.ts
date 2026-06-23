import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // @ts-ignore
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
