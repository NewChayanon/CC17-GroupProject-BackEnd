const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const password = bcrypt.hashSync('123456789')
const userData = [
  { email: 'admin@mail.com',password,firstName:"Admin",lastName:"Admin",mobile:"0000000000",isAdmin:true }
]
const run = async () => {
  await prisma.users.createMany({ data : userData })
}
run()