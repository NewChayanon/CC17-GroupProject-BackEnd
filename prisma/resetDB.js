require('dotenv').config()
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()
async function run() {
  await prisma.$executeRawUnsafe(`DROP Database ${process.env.DB}`)
  await prisma.$executeRawUnsafe(`CREATE Database ${process.env.DB}`)
}
console.log('Reset DB..')
run()