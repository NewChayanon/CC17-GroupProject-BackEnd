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
    profileImage: "https://picsum.photos/200",
    role: "ADMIN",
  },
  {
    email: "test01@mail.com",
    password,
    firstName: "test01",
    lastName: "test01",
    mobile: "0101010101",
    displayName: "test01",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test02@mail.com",
    password,
    firstName: "test02",
    lastName: "test02",
    mobile: "0202020202",
    displayName: "test02",
    profileImage: "https://picsum.photos/200",
    role: "SELLER",
  }, //seller-3
  {
    email: "test03@mail.com",
    password,
    firstName: "test03",
    lastName: "test03",
    mobile: "0303030303",
    displayName: "test03",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test04@mail.com",
    password,
    firstName: "test04",
    lastName: "test04",
    mobile: "0404040404",
    displayName: "test04",
    profileImage: "https://picsum.photos/200",
    role: "SELLER",
  }, //seller-5
  {
    email: "test05@mail.com",
    password,
    firstName: "test05",
    lastName: "test05",
    mobile: "0505050505",
    displayName: "test05",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test06@mail.com",
    password,
    firstName: "test06",
    lastName: "test06",
    mobile: "0606060606",
    displayName: "test06",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test07@mail.com",
    password,
    firstName: "test07",
    lastName: "test07",
    mobile: "0707070707",
    displayName: "test07",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test08@mail.com",
    password,
    firstName: "test08",
    lastName: "test08",
    mobile: "0808080808",
    displayName: "test08",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test09@mail.com",
    password,
    firstName: "test09",
    lastName: "test09",
    mobile: "0909090909",
    displayName: "test09",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test10@mail.com",
    password,
    firstName: "test10",
    lastName: "test10",
    mobile: "1010101010",
    displayName: "test10",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test11@mail.com",
    password,
    firstName: "test11",
    lastName: "test11",
    mobile: "1111111111",
    displayName: "test11",
    profileImage: "https://picsum.photos/200",
    role: "SELLER",
  }, //seller-12
];
const storeProfile = [
  {
    userId: 3,
    name: "bananaStore",
    coverImage: "https://picsum.photos/400",
    description: "bananaStore",
  },
  {
    userId: 5,
    name: "DurianStore",
    coverImage: "https://picsum.photos/400",
    description: "DurianStore",
  },
  {
    userId: 12,
    name: "mangosteen",
    coverImage: "https://picsum.photos/400",
    description: "mangosteen",
  },
];
const event = [
  {
    storeProfileId: 1,
    name: "bananaEvent",
    images: "https://picsum.photos/400",
    location: "13.764975952290223,100.53828213857393",
    locationName: "อนุสาวรีย์ชัยสมรภูมิ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
  {
    storeProfileId: 1,
    name: "bananaEvent",
    images: "https://picsum.photos/400",
    location: "13.757544971580751,100.53668712303082",
    locationName: "ก๋วยเตี๋ยวลูกชิ้นปลาแปะเตียง",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
  {
    storeProfileId: 2,
    name: "bananaEvent",
    images: "https://picsum.photos/400",
    location: "13.856011854291697,100.58539301844694",
    locationName: "มหาวิทยาลัยศรีปทุม",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
    startDate: "24/06/2024",
    endDate: "25/06/2024",
    isActive: true,
  },
  {
    storeProfileId: 3,
    name: "bananaEvent",
    images: "https://picsum.photos/400",
    location: "13.856011854291697,100.58539301844694",
    locationName: "มหาวิทยาลัยศรีปทุม",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
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
  {
    storeProfileId: 1,
    name: "Durian",
    description: "Durian",
    image: "https://picsum.photos/200",
  },
  {
    storeProfileId: 1,
    name: "mangosteen",
    description: "mangosteen",
    image: "https://picsum.photos/200",
  },
  {
    storeProfileId: 1,
    name: "longan",
    description: "longan",
    image: "https://picsum.photos/200",
  },
];
const eventItem = [
  { eventId: 1, productId: 1, price: 100 },
  { eventId: 1, productId: 2, price: 100 },
];
const voucherList = [
  {
    eventId: 1,
    code: "25JUN50P",
    condition: "test",
    totalAmount: 20,
    discount: 10,
  },
  {
    eventId: 2,
    code: "25JUN50P",
    condition: "test",
    totalAmount: 20,
    discount: 10,
  },
  {
    eventId: 3,
    code: "25JUN50P",
    condition: "test",
    totalAmount: 10,
    discount: 10,
  },
  {
    eventId: 4,
    code: "25JUN50P",
    condition: "test",
    totalAmount: 20,
    discount: 10,
  },
];
const voucherItem = [
  { storeProfileId: 1, voucherListId: 1, userId: 2 },
  { storeProfileId: 1, voucherListId: 1, userId: 6 },
  { storeProfileId: 1, voucherListId: 1, userId: 7 },
  { storeProfileId: 1, voucherListId: 1, userId: 8 },
  { storeProfileId: 1, voucherListId: 2, userId: 2 },
  { storeProfileId: 1, voucherListId: 2, userId: 4 },
  { storeProfileId: 1, voucherListId: 2, userId: 6 },
  { storeProfileId: 1, voucherListId: 2, userId: 7 },
  { storeProfileId: 1, voucherListId: 2, userId: 8 },
  { storeProfileId: 2, voucherListId: 3, userId: 2 },
  { storeProfileId: 2, voucherListId: 3, userId: 4 },
  { storeProfileId: 2, voucherListId: 3, userId: 6 },
  { storeProfileId: 2, voucherListId: 3, userId: 7 },
  { storeProfileId: 2, voucherListId: 3, userId: 8 },
  { storeProfileId: 2, voucherListId: 3, userId: 9 },
  { storeProfileId: 2, voucherListId: 3, userId: 10 },
  { storeProfileId: 2, voucherListId: 3, userId: 11 },
  { storeProfileId: 3, voucherListId: 4, userId: 7 },
  { storeProfileId: 3, voucherListId: 4, userId: 8 },
  { storeProfileId: 3, voucherListId: 4, userId: 9 },
  { storeProfileId: 3, voucherListId: 4, userId: 10 },
  { storeProfileId: 3, voucherListId: 4, userId: 11 },
];
const follow = [
  { storeProfileId: 1, userId: 2 },
  { storeProfileId: 2, userId: 2 },
  { storeProfileId: 3, userId: 2 },
  { storeProfileId: 1, userId: 4 },
  { storeProfileId: 1, userId: 6 },
  { storeProfileId: 3, userId: 6 },
];
const comment = [
  { storeProfileId: 1, userId: 2, comment: "D", rate: "FIVE", isVerify: true },
  { storeProfileId: 1, userId: 4, comment: "F", rate: "ONE" },
];
const inboxMessageUser = [
  {
    userIdSender: 1,
    userIdReceiver: 2,
    topic: "Down Server",
    message: "Down Server : 26/06/2024",
  },
  {
    userIdSender: 12,
    userIdReceiver: 2,
    topic: "mangosteen",
    message: "mangosteen DDD",
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
  await prisma.voucherList.createMany({ data: voucherList });
  await prisma.voucherItem.createMany({ data: voucherItem });
  await prisma.follow.createMany({ data: follow });
  await prisma.comment.createMany({ data: comment });
  await prisma.inboxMessageUser.createMany({ data: inboxMessageUser });
  await prisma.report.create({ data: report });
};
run();
