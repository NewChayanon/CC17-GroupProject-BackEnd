require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function run() {
  await prisma.$executeRawUnsafe(`DROP Database ${process.env.DB}`);
  await prisma.$executeRawUnsafe(`CREATE Database ${process.env.DB}`);
}
console.log("Reset DB..");
run();

/* 

pnpm run resetDB
pnpm exec prisma db push
pnpm exec prisma db seed

*/
