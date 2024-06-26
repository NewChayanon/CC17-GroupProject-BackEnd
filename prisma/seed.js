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
    displayName: "Admin",
    role: "ADMIN",
  },
  {
    email: "test01@mail.com",
    password,
    firstName: "test01",
    lastName: "test01",
    mobile: "0101010101",
    displayName: "test01",
  }, //buyer
  {
    email: "test02@mail.com",
    password,
    firstName: "test02",
    lastName: "test02",
    mobile: "0202020202",
    displayName: "test02",
    role: "SELLER",
  }, //seller-3
  {
    email: "test03@mail.com",
    password,
    firstName: "test03",
    lastName: "test03",
    mobile: "0303030303",
    displayName: "test03",
  }, //buyer
  {
    email: "test04@mail.com",
    password,
    firstName: "test04",
    lastName: "test04",
    mobile: "0404040404",
    displayName: "test04",
    role: "SELLER",
  }, //seller-5
  {
    email: "test05@mail.com",
    password,
    firstName: "test05",
    lastName: "test05",
    mobile: "0505050505",
    displayName: "test05",
  }, //buyer
  {
    email: "test06@mail.com",
    password,
    firstName: "test06",
    lastName: "test06",
    mobile: "0606060606",
    displayName: "test06",
  }, //buyer
  {
    email: "test07@mail.com",
    password,
    firstName: "test07",
    lastName: "test07",
    mobile: "0707070707",
    displayName: "test07",
  }, //buyer
  {
    email: "test08@mail.com",
    password,
    firstName: "test08",
    lastName: "test08",
    mobile: "0808080808",
    displayName: "test08",
  }, //buyer
  {
    email: "test09@mail.com",
    password,
    firstName: "test09",
    lastName: "test09",
    mobile: "0909090909",
    displayName: "test09",
  }, //buyer
  {
    email: "test10@mail.com",
    password,
    firstName: "test10",
    lastName: "test10",
    mobile: "1010101010",
    displayName: "test10",
  }, //buyer
];
const storeProfile = [
  {
    userId: 3,
    name: "bananaStore",
    coverImage: "bananaStore",
    description: "bananaStore",
  },
  {
    userId: 4,
    name: "DurianStore",
    coverImage: "DurianStore",
    description: "DurianStore",
  },
];
const event = [
  {
    storeProfileId: 1,
    name: "bananaEvent",
    images: "bananaEvent",
    location: "13.764975952290223,100.53828213857393",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
  {
    storeProfileId: 1,
    name: "bananaEvent",
    images: "bananaEvent",
    location: "13.757544971580751,100.53668712303082",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
  {
    storeProfileId: 2,
    name: "bananaEvent",
    images: "bananaEvent",
    location: "13.856011854291697,100.58539301844694",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
];
const interest = [
  {
    userId: 2,
    eventId: 1,
  },
  {
    userId: 2,
    eventId: 2,
  },
];
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
const voucherList = {
  eventId: 1,
  code: "25JUN50P",
  condition: "test",
  totalAmount: 20,
};
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
const report = { userIdReporter: 4, userIdReported: 3, message: "test" };

const run = async () => {
  await prisma.users.createMany({ data: userData });
  await prisma.storeProfile.createMany({ data: storeProfile });
  await prisma.events.createMany({ data: event });
  await prisma.interest.createMany({ data: interest });
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
