require('dotenv').config()
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()
async function run() {
  await prisma.$executeRawUnsafe("DROP Database CC17_GroupProject")
  await prisma.$executeRawUnsafe("CREATE Database CCC17_GroupProject")
}
console.log('Reset DB..')
run()