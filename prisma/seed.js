const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const password = bcrypt.hashSync('123456789')
const userData = [
  { email: 'admin@mail.com', password, firstName: "Admin", lastName: "Admin", mobile: "0000000000", isAdmin: true },
  { email: 'test01@mail.com', password, firstName: "test01", lastName: "test01", mobile: "0101010101", isSeller: false },//buyer
  { email: 'test02@mail.com', password, firstName: "test02", lastName: "test02", mobile: "0202020202", isSeller: true },//seller
]
const storeProfile = {
  userId: 3,
  name: "bananaStore",
  coverImage: "bananaStore",
  discription: "bananaStore"
}
const event = {
  storeProfileId: 1,
  name: "bananaEvent",
  images: "bananaEvent",
  location: "100.5,-50.66",
  startDate: "24/06/2024",
  endDate: "25/06/2024",
  isActive: true
}
const interest = {
  userId  :2,
  eventId :1,
}

const run = async () => {
  await prisma.users.createMany({ data: userData })
  await prisma.storeProfile.create({ data: storeProfile })
  await prisma.events.create({ data: event })
  await prisma.interest.create({data:interest})
}
run()