const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const password = bcrypt.hashSync("123456789");
const userData = [
  {
    email: "admin@mail.com",
    password,
    firstName: "Admin",
    lastName: "Admin",
    mobile: "0000000000",
    displayName:"Admin",
    role: "ADMIN",
  },
  {
    id: 2,
    email: "test01@mail.com",
    password,
    firstName: "test01",
    lastName: "test01",
    mobile: "0101010101",
    displayName:"test01",
  }, //buyer
  {
    id: 3,
    email: "test02@mail.com",
    password,
    firstName: "test02",
    lastName: "test02",
    mobile: "0202020202",
    displayName:"test02",
    role: "SELLER",
  }, //seller
  {
    id: 4,
    email: "test03@mail.com",
    password,
    firstName: "test03",
    lastName: "test03",
    mobile: "0303030303",
    displayName:"test03",
  }, //buyer
];
const storeProfile = {
  userId: 3,
  name: "bananaStore",
  coverImage: "bananaStore",
  description: "bananaStore",
};
const event = {
  storeProfileId: 1,
  name: "bananaEvent",
  images: "bananaEvent",
  location: "100.5,-50.66",
  startDate: "24/06/2024",
  endDate: "25/06/2024",
  isActive: true,
};
const interest = {
  userId: 1,
  eventId: 1,
};
const product = [
  { storeProfileId: 1, name: "Durian", description: "Durian", image: "Durian" },
  {
    storeProfileId: 1,
    name: "mangosteen",
    description: "mangosteen",
    image: "mangosteen",
  },
  { storeProfileId: 1, name: "longan", description: "longan", image: "longan" },
];
const eventItem = [
  { eventId: 1, productId: 1 },
  { eventId: 1, productId: 2 },
];
const voucherList = { eventId: 1, code: "25JUN50P", totalAmount: 20 };
const voucherItem = { voucherListId: 1, userId: 2 };
const follow = { storeProfileId: 1, userId: 2 };
const comment = [
  { storeProfileId: 1, userId: 2, comment: "D", rate: "FIVE", isVerify: true },
  { storeProfileId: 1, userId: 4, comment: "F", rate: "ONE" },
];
const inboxMessage = [
  {
    userIdSender: 1,
    userIdReceiver: 2,
    topic: "Down Server",
    message: "Down Server : 26/06/2024",
  },
  {
    userIdSender: 1,
    userIdReceiver: 3,
    topic: "Down Server",
    message: "Down Server : 26/06/2024",
  },
  {
    userIdSender: 1,
    userIdReceiver: 4,
    topic: "Down Server",
    message: "Down Server : 26/06/2024",
  },
];
const report = { userIdReporter: 4, userIdReported: 3 };
const run = async () => {
  await prisma.users.createMany({ data: userData });
  await prisma.storeProfile.create({ data: storeProfile });
  await prisma.events.create({ data: event });
  await prisma.interest.create({ data: interest });
  await prisma.product.createMany({ data: product });
  await prisma.eventItem.createMany({ data: eventItem });
  await prisma.voucherList.create({ data: voucherList });
  await prisma.voucherItem.create({ data: voucherItem });
  await prisma.follow.create({ data: follow });
  await prisma.comment.createMany({ data: comment });
  await prisma.inboxMessage.createMany({ data: inboxMessage });
  await prisma.report.create({ data: report });
};
run();
