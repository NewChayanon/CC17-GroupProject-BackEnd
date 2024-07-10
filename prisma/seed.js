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
    displayName: "Buyer1",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test02@mail.com",
    password,
    firstName: "test02",
    lastName: "test02",
    mobile: "0202020202",
    displayName: "Durian Store",
    profileImage: "https://picsum.photos/200",
    role: "SELLER",
  }, //seller-3
  {
    email: "test03@mail.com",
    password,
    firstName: "test03",
    lastName: "test03",
    mobile: "0303030303",
    displayName: "buyer2",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test04@mail.com",
    password,
    firstName: "test04",
    lastName: "test04",
    mobile: "0404040404",
    displayName: "silverNoodleSmith",
    profileImage: "https://picsum.photos/200",
    role: "SELLER",
  }, //seller-5
  {
    email: "test05@mail.com",
    password,
    firstName: "test05",
    lastName: "test05",
    mobile: "0505050505",
    displayName: "buyer3",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  {
    email: "test06@mail.com",
    password,
    firstName: "test06",
    lastName: "test06",
    mobile: "0606060606",
    displayName: "buyer4",
    profileImage: "https://picsum.photos/200",
  }, //buyer
  // {
  //   email: "test07@mail.com",
  //   password,
  //   firstName: "test07",
  //   lastName: "test07",
  //   mobile: "0707070707",
  //   displayName: "test07",
  //   profileImage: "https://picsum.photos/200",
  // }, //buyer
  // {
  //   email: "test08@mail.com",
  //   password,
  //   firstName: "test08",
  //   lastName: "test08",
  //   mobile: "0808080808",
  //   displayName: "test08",
  //   profileImage: "https://picsum.photos/200",
  // }, //buyer
  // {
  //   email: "test09@mail.com",
  //   password,
  //   firstName: "test09",
  //   lastName: "test09",
  //   mobile: "0909090909",
  //   displayName: "test09",
  //   profileImage: "https://picsum.photos/200",
  // }, //buyer
  // {
  //   email: "test10@mail.com",
  //   password,
  //   firstName: "test10",
  //   lastName: "test10",
  //   mobile: "1010101010",
  //   displayName: "test10",
  //   profileImage: "https://picsum.photos/200",
  // }, //buyer
  // {
  //   email: "test11@mail.com",
  //   password,
  //   firstName: "test11",
  //   lastName: "test11",
  //   mobile: "1111111111",
  //   displayName: "test11",
  //   profileImage: "https://picsum.photos/200",
  //   role: "SELLER",
  // }, //seller-12
  // {
  //   email: "test12@mail.com",
  //   password,
  //   firstName: "test11",
  //   lastName: "test11",
  //   mobile: "1212121212",
  //   displayName: "test11",
  //   profileImage: "https://picsum.photos/200",
  //   role: "SELLER",
  // }, //seller-13
];
const storeProfile = [
  {
    userId: 3,
    name: "DurianFruitsStore",
    coverImage: "https://picsum.photos/400",
    sellerDescription:
      "จันทบุรี ประเทศไทย",
    description:
      "Welcome to Durian Aroi Aroi, where the passion for delivering the freshest and most delicious durians drives everything we do. Nestled in the heart of Chantaburi province, our store is dedicated to bringing you the best durians Thailand has to offer. Established on 12 March 2023, Durian Aroi Aroi quickly became a beloved source for durian enthusiasts seeking premium quality and exceptional taste. Our commitment to excellence begins at the orchard, where our durians are carefully cultivated and harvested at the peak of ripeness. We take pride in our sustainable farming practices and our dedication to providing fruits that are not only delicious but also responsibly grown.At Durian Aroi Aroi, we believe that every durian lover deserves a perfect durian experience. Whether you're a seasoned connoisseur or trying durian for the first time, our store offers a variety of durian types to suit every palate. From the rich and creamy Mon Thong to the unique flavors of Kan Yao, our selection is sure to delight.∂ us on this flavorful journey and discover why Durian Aroi Aroi is the preferred choice for durian aficionados in Chantaburi and beyond. Our store is more than just a place to buy durians; it's a community of durian lovers who share a passion for this king of fruits. We look forward to serving you and making your durian dreams come true.",
    facebook: "https://picsum.photos/400",
    instagram: "https://picsum.photos/400",
    storeProductType: "sssss",
  },
  {
    userId: 5,
    name: "SilverNoodleSmith",
    coverImage: "https://picsum.photos/400",
    sellerDescription:
      "กรุงเทพมหานคร ประเทศไทย",
    description:
      "Boat noodle lovers can enjoy the taste of rich beef broth and premium beef in old rustic vibe.",
    facebook: "https://picsum.photos/400",
    instagram: "https://picsum.photos/400",
    line: "https://picsum.photos/400",
    storeProductType: "sssss",
  },
  // {
  //   userId: 12,
  //   name: "mangosteen",
  //   coverImage: "https://picsum.photos/400",
  //   sellerDescription:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
  //   facebook: "https://picsum.photos/400",
  //   instagram: "https://picsum.photos/400",
  //   line: "https://picsum.photos/400",
  //   storeProductType: "sssss",
  // },
  // {
  //   userId: 13,
  //   name: "mangosteen",
  //   coverImage: "https://picsum.photos/400",
  //   sellerDescription:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
  //   facebook: "https://picsum.photos/400",
  //   instagram: "https://picsum.photos/400",
  //   line: "https://picsum.photos/400",
  //   storeProductType: "sssss",
  // },
];
const event = [
  {
    storeProfileId: 1,
    name: "GlobalFruitEvent1",
    images: "https://picsum.photos/400",
    location: "13.764975952290223,100.53828213857393",
    locationName: "อนุสาวรีย์ชัยสมรภูมิ",
    description:
      "Welcome to Durian Aroi Aroi, where the passion for delivering the freshest and most delicious durians drives everything we do. Nestled in the heart of Chantaburi province, our store is dedicated to bringing you the best durians Thailand has to offer. Established on 12 March 2023, Durian Aroi Aroi quickly became a beloved source for durian enthusiasts seeking premium quality and exceptional taste. Our commitment to excellence begins at the orchard, where our durians are carefully cultivated and harvested at the peak of ripeness. We take pride in our sustainable farming practices and our dedication to providing fruits that are not only delicious but also responsibly grown.At Durian Aroi Aroi, we believe that every durian lover deserves a perfect durian experience. Whether you're a seasoned connoisseur or trying durian for the first time, our store offers a variety of durian types to suit every palate. From the rich and creamy Mon Thong to the unique flavors of Kan Yao, our selection is sure to delight.∂ us on this flavorful journey and discover why Durian Aroi Aroi is the preferred choice for durian aficionados in Chantaburi and beyond. Our store is more than just a place to buy durians; it's a community of durian lovers who share a passion for this king of fruits. We look forward to serving you and making your durian dreams come true.",
    startDate: "2024-07-07T00:00:00.000Z",
    endDate: "2024-07-07T00:00:00.000Z",
    openTime: "2024-07-07T09:00:00Z",
    closingTime: "2024-07-07T18:00:00Z",
    isActive: true,
  },
  {
    storeProfileId: 1,
    name: "GlobalFruitEvent2",
    images: "https://picsum.photos/400",
    location: "13.753820959249595, 100.5397820671743",
    locationName: "ตลาดกลางคืนประตูน้า",
    description:
      "Welcome to Durian Aroi Aroi, where the passion for delivering the freshest and most delicious durians drives everything we do. Nestled in the heart of Chantaburi province, our store is dedicated to bringing you the best durians Thailand has to offer. Established on 12 March 2023, Durian Aroi Aroi quickly became a beloved source for durian enthusiasts seeking premium quality and exceptional taste. Our commitment to excellence begins at the orchard, where our durians are carefully cultivated and harvested at the peak of ripeness. We take pride in our sustainable farming practices and our dedication to providing fruits that are not only delicious but also responsibly grown.At Durian Aroi Aroi, we believe that every durian lover deserves a perfect durian experience. Whether you're a seasoned connoisseur or trying durian for the first time, our store offers a variety of durian types to suit every palate. From the rich and creamy Mon Thong to the unique flavors of Kan Yao, our selection is sure to delight.∂ us on this flavorful journey and discover why Durian Aroi Aroi is the preferred choice for durian aficionados in Chantaburi and beyond. Our store is more than just a place to buy durians; it's a community of durian lovers who share a passion for this king of fruits. We look forward to serving you and making your durian dreams come true.",
    startDate: "2024-07-10T00:00:00.000Z",
    endDate: "2024-07-10T00:00:00.000Z",
    openTime: "2024-07-10T20:00:00Z",
    closingTime: "2024-07-10T00:00:00Z",
    isActive: true,
  },
  {
    storeProfileId: 1,
    name: "DurianFruitEvent3",
    images: "https://picsum.photos/400",
    location: "13.761816727289819, 100.53708691047177",
    locationName: "Cuntury Victory Monument",
    description:
      "Welcome to Durian Aroi Aroi, where the passion for delivering the freshest and most delicious durians drives everything we do. Nestled in the heart of Chantaburi province, our store is dedicated to bringing you the best durians Thailand has to offer. Established on 12 March 2023, Durian Aroi Aroi quickly became a beloved source for durian enthusiasts seeking premium quality and exceptional taste. Our commitment to excellence begins at the orchard, where our durians are carefully cultivated and harvested at the peak of ripeness. We take pride in our sustainable farming practices and our dedication to providing fruits that are not only delicious but also responsibly grown.At Durian Aroi Aroi, we believe that every durian lover deserves a perfect durian experience. Whether you're a seasoned connoisseur or trying durian for the first time, our store offers a variety of durian types to suit every palate. From the rich and creamy Mon Thong to the unique flavors of Kan Yao, our selection is sure to delight.∂ us on this flavorful journey and discover why Durian Aroi Aroi is the preferred choice for durian aficionados in Chantaburi and beyond. Our store is more than just a place to buy durians; it's a community of durian lovers who share a passion for this king of fruits. We look forward to serving you and making your durian dreams come true.",
    startDate: "2024-07-10T00:00:00.000Z",
    endDate: "2024-07-10T00:00:00.000Z",
    openTime: "2024-07-10T09:00:00Z",
    closingTime: "2024-07-10T18:00:00Z",
    isActive: true,
  },
  {
    storeProfileId: 2,
    name: "SilverSmithStore",
    images: "https://picsum.photos/400",
    location: "13.761816727289819, 100.53708691047177",
    locationName: "Cuntury Victory Monument",
    description:
      "Boat noodle lovers can enjoy the taste of rich beef broth and premium beef in old rustic vibe.",
    startDate: "2024-07-10T00:00:00.000Z",
    endDate: "2024-07-10T00:00:00.000Z",
    openTime: "2024-07-10T09:00:00Z",
    closingTime: "2024-07-10T18:00:00Z",
    isActive: true,
  },
  {
    storeProfileId: 2,
    name: "SilverSmithStore",
    images: "https://picsum.photos/400",
    location: "13.746829877719778, 100.53529076933539",
    locationName: "Siam Paragon Food Hall",
    description:
      "Boat noodle lovers can enjoy the taste of rich beef broth and premium beef in old rustic vibe.",
    startDate: "2024-07-07T12:00:00.000Z",
    endDate: "2024-07-07T12:00:00.000Z",
    openTime: "2024-07-12T09:00:00Z",
    closingTime: "2024-07-12T20:00:00Z",
    isActive: false,
  },
  // {
  //   storeProfileId: 1,
  //   name: "bananaEvent",
  //   images: "https://picsum.photos/400",
  //   location: "13.757544971580751,100.53668712303082",
  //   locationName: "ก๋วยเตี๋ยวลูกชิ้นปลาแปะเตียง",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
  //   startDate: "2024-07-07T00:00:00.000Z",
  //   endDate: "2024-07-07T00:00:00.000Z",
  //   openTime: "2024-07-07T09:00:00Z",
  //   closingTime: "2024-07-07T18:00:00Z",
  //   isActive: false,
  // },
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
  {
    userId: 4,
    eventId: 3,
  },
  {
    userId: 6,
    eventId: 4,
  },
  {
    userId: 7,
    eventId: 5,
  },
];
const product = [
  {
    storeProfileId: 1,
    name: "ทุเรียนหมอนทอง",
    description: "Durian",
    image: "https://picsum.photos/200",
    price: 200,
    unit: "KG",
  },
  {
    storeProfileId: 1,
    name: "ทุเรียนก้านยาว",
    description: "Durian",
    image: "https://picsum.photos/200",
    price: 150,
    unit: "KG",
  },
  {
    storeProfileId: 1,
    name: "ทุเรียนชะนี",
    description: "Durian",
    image: "https://picsum.photos/200",
    price: 200,
    unit: "KG",
  },
  {
    storeProfileId: 2,
    name: "wagyu A4 noodle",
    description: "boat noodle",
    image: "https://picsum.photos/200",
    price: 400,
    unit: "dish",
  },
  {
    storeProfileId: 2,
    name: "kurobuta noodle",
    description: "boat noodle",
    image: "https://picsum.photos/200",
    price: 350,
    unit: "dish",
  },
  {
    storeProfileId: 2,
    name: "normal noodle",
    description: "boat noodle",
    image: "https://picsum.photos/200",
    price: 200,
    unit: "dish",
  },
];
const eventItem = [
  { eventId: 1, productId: 1 },
  { eventId: 1, productId: 2 },
  { eventId: 1, productId: 3 },
  { eventId: 2, productId: 1 },
  { eventId: 2, productId: 2 },
  { eventId: 2, productId: 3 },
  { eventId: 3, productId: 1 },
  { eventId: 3, productId: 2 },
  { eventId: 3, productId: 3 },
  { eventId: 4, productId: 1 },
  { eventId: 4, productId: 2 },
  { eventId: 4, productId: 3 },
  { eventId: 5, productId: 1 },
  { eventId: 5, productId: 2 },
  { eventId: 5, productId: 3 },

];
const voucherList = [
  {
    eventId: 1,
    code: "25JUN50P",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt!",
    condition: "test",
    totalAmount: 5,
    discount: 10,
    image: "https://picsum.photos/200",
  },
  {
    eventId: 2,
    code: "25JUN50P",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt!",
    condition: "test",
    totalAmount: 20,
    discount: 10,
    image: "https://picsum.photos/200",
  },
  {
    eventId: 3,
    code: "25JUN50P",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt!",
    condition: "test",
    totalAmount: 7,
    discount: 10,
    image: "https://picsum.photos/200",
  },
  {
    eventId: 4,
    code: "25JUN50P",
    description:
      "Boat noodle lovers can enjoy the taste of rich beef broth, premium beef and premium kurobuta in old rustic vibe.",
    condition: "test",
    totalAmount: 20,
    discount: 20,
    image: "https://picsum.photos/200",
  },
  {
    eventId: 5,
    code: "25JUN50P",
    description:
      "Boat noodle lovers can enjoy the taste of rich beef broth, premium beef and premium kurobuta in old rustic vibe",
    condition: "test",
    totalAmount: 20,
    discount: 20,
    image: "https://picsum.photos/200",
  },
];
const voucherItem = [
  { storeProfileId: 1, voucherListId: 1, userId: 2 },
  { storeProfileId: 1, voucherListId: 1, userId: 6 },
  { storeProfileId: 1, voucherListId: 1, userId: 7 },
  { storeProfileId: 1, voucherListId: 1, userId: 3 },
  { storeProfileId: 1, voucherListId: 2, userId: 2 },
  { storeProfileId: 1, voucherListId: 2, userId: 4 },
  { storeProfileId: 1, voucherListId: 2, userId: 6 },
  { storeProfileId: 1, voucherListId: 2, userId: 7 },
  { storeProfileId: 1, voucherListId: 2, userId: 4 },
  { storeProfileId: 2, voucherListId: 3, userId: 2 },
  { storeProfileId: 2, voucherListId: 3, userId: 4 },
  { storeProfileId: 2, voucherListId: 3, userId: 6 },
  { storeProfileId: 2, voucherListId: 3, userId: 7 },
  { storeProfileId: 2, voucherListId: 3, userId: 2 },
  { storeProfileId: 2, voucherListId: 3, userId: 5 },
];
const follow = [
  { storeProfileId: 1, userId: 2 },
  { storeProfileId: 2, userId: 2 },
  { storeProfileId: 1, userId: 3 },
  { storeProfileId: 1, userId: 4 },
  { storeProfileId: 1, userId: 6 },
  { storeProfileId: 2, userId: 6 },
];
const comment = [
  {
    storeProfileId: 1,
    userId: 2,
    topic: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
    rate: "FIVE",
    isVerify: true,
  },
  {
    storeProfileId: 1,
    userId: 4,
    topic: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores, quisquam error ex sit natus debitis ratione distinctio saepe, harum, facere laborum deleniti autem dolorem asperiores consequuntur accusamus eveniet incidunt! Ea a unde tenetur sint neque blanditiis architecto fugit aliquid, exercitationem, odit reprehenderit, vitae nobis quo? Error distinctio dolores nam.",
    rate: "ONE",
  },
];
const inboxMessageUser = [
  {
    userIdSender: 1,
    userIdReceiver: 2,
    topic: "เปิดร้าน",
    message: "Down Server : 26/06/2024",
  },
  {
    userIdSender: 1,
    userIdReceiver: 3,
    topic: "เปิดร้าน",
    message: "มาอุดหนุนกันด้วยนะครับ",
  },
  {
    userIdSender: 1,
    userIdReceiver: 4,
    topic: "เปิดร้าน",
    message: "มาอุดหนุนกันด้วยนะครับ",
  },
  {
    userIdSender: 2,
    userIdReceiver: 4,
    topic: "เปิดร้าน",
    message: "มาอุดหนุนกันด้วยนะครับ",
  },
  {
    userIdSender: 2,
    userIdReceiver: 6,
    topic: "เปิดร้าน",
    message: "มาอุดหนุนกันด้วยนะครับ",
  },
];
const report = {
  userIdReporter: 4,
  storeProfileReported: 3,
  subject: "mangosteen",
  message: "test",
  image: "https://picsum.photos/400",
};

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
