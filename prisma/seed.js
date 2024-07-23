const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const password = bcrypt.hashSync("123456789");

//##Users Table
const userData = [
  //ADMIN
  {
    //Admin#1 User#1git
    email: "admin@mail.com",
    password,
    firstName: "Admin",
    lastName: "Admin",
    mobile: "0888189900",
    displayName: "Admin",
    gender: "OTHERS",
    profileImage:
      "https://img.freepik.com/premium-photo/cute-cartoon-durian-character-generative-ai_842983-1027.jpg?w=740",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  //BUYERS
  {
    //Buyer#1 User#2
    email: "buyer_duangjai@mail.com",
    password,
    firstName: "Duangjai",
    lastName: "Denketsinee",
    mobile: "0881818811",
    displayName: "Hugme187",
    gender: "FEMALE",
    profileImage:
      "https://www.creativefabrica.com/wp-content/uploads/2022/10/09/Miku-Hatsune-In-Avatar-Style-40847061-1.png",
    role: "BUYER",
  },
  {
    //Buyer#2 User#3
    email: "buyer_tanaka@mail.com",
    password,
    firstName: "Kazuhiro",
    lastName: "Tanaka",
    mobile: "0982023242",
    displayName: "Samurai12",
    gender: "MALE",
    profileImage:
      "https://masterpiecer-images.s3.yandex.net/a6e973c871de11ee884af6c574779d3e:upscaled",
    role: "BUYER",
  },
  {
    //Buyer#3 User#4
    email: "buyer_christian@mail.com",
    password,
    firstName: "Christian",
    lastName: "Delacroix",
    mobile: "0303030303",
    displayName: "V Gourmet",
    gender: "MALE",
    profileImage:
      "https://aveurope.es/wp-content/uploads/2016/11/btx-avatar-placeholder-01.jpg",
    role: "BUYER",
  },
  {
    //Buyer#4 User#5
    email: "buyer_tomoko@mail.com",
    password,
    firstName: "知子",
    lastName: "畠山",
    mobile: "0825550355",
    displayName: "tomohatake",
    gender: "FEMALE",
    profileImage:
      "https://i.pinimg.com/736x/bd/8d/59/bd8d59d50ad7d51eeeab6a660ad0920f.jpg",
    role: "BUYER",
  },
  {
    //seller#1 User#6
    email: "seller_mooping@mail.com",
    password,
    firstName: "Natcha",
    lastName: "Ratanapolsuk",
    mobile: "0885055545",
    displayName: "Natcha16",
    gender: "FEMALE",
    profileImage:
      "https://64.media.tumblr.com/ab5729eed72a847352d367567c567788/fe4d8ffa527c5af7-56/s1280x1920/958c6d3e66a697231b4ae296168a9228176334f0.jpg",
    role: "SELLER",
  },
  {
    //seller#2 User#7
    email: "seller_durian@mail.com",
    password,
    firstName: "静怡",
    lastName: "李",
    mobile: "0979778877",
    displayName: "Duriano-X",
    gender: "MALE",
    profileImage:
      "https://qph.cf2.quoracdn.net/main-qimg-6cdacca8b9af4283eac60abbc764faf7.webp",
    role: "SELLER",
  },
  {
    //seller#3 User#8
    email: "seller_boatnoodle@mail.com",
    password,
    firstName: "อาทิตย์",
    lastName: "แซ่ตั้ง",
    mobile: "0972238278",
    displayName: "Noodi Boat",
    gender: "MALE",
    profileImage:
      "https://i.pinimg.com/236x/41/12/68/411268000f91997d7aeb36e2c82c7972.jpg",
    role: "SELLER",
  },
  {
    //seller#4 User#9
    email: "seller_thaifruit@mail.com",
    password,
    firstName: "Kaimook",
    lastName: "Charoenploy",
    mobile: "0998997899",
    displayName: "Sawan Fruity",
    gender: "FEMALE",
    profileImage:
      "https://img.freepik.com/premium-photo/close-up-portrait-beautiful-asian-woman-against-plain-background-generative-ai_601748-44165.jpg",
    role: "SELLER",
  },
  {
    //seller#5 User#10
    email: "seller_kanomthai@mail.com",
    password,
    firstName: "Ploychompoo",
    lastName: "Sandeewongs",
    mobile: "0901103110",
    displayName: "Thaikanom",
    gender: "OTHERS",
    profileImage:
      "https://us.123rf.com/450wm/reborn55/reborn551304/reborn55130400001/19167909-chef-showing-bakery.jpg?ver=6",
    role: "SELLER",
  },
  {
    //seller#6 User#11
    email: "seller_namprik@mail.com",
    password,
    firstName: "Pranee",
    lastName: "Mitruangroj",
    mobile: "0819228811",
    displayName: "MaePranee",
    gender: "FEMALE",
    profileImage:
      "https://i.pinimg.com/736x/83/2c/e9/832ce93776f83317709ed1e3d599a9ac.jpg",
    role: "SELLER",
  },
];

//##### StoreProfile Table
const storeProfile = [
  {
    userId: 6,
    name: "Mooping Aroi🐷",
    coverImage:
      "https://www.btlfood.com.sg/image/catalog/products/Kin%20Loei/Foods-27.jpg",
    sellerDescription:
      "Natcha is the passionate cook behind the most delectable mooping (pork skewers) in Bangkok. With a love for traditional Thai flavors and a knack for culinary creativity, Natcha brings her family recipes to life in every bite.",
    description:
      "At Mooping Aroi, authentic Thai pork skewers that are marinated to perfection and grilled with love are carefully made for all. Our cozy food stall is dedicated to delivering a delicious and memorable street food experience. Come by for a taste of Thailand street food you won't forget!",
    facebook: "https://facebook.com/MoopingAroi",
    instagram: "https://instagram.com/MoopingAroi",
    line: "https://line.me/ti/p/~MoopingAroi",
    storeProductType: "skewers",
    createdAt: "2024-07-01T00:00:00.000Z",
    updatedAt: "2024-07-01T00:00:00.000Z",
  },
  {
    userId: 7,
    name: "Durian Hao-chi",
    coverImage:
      "https://promotions.co.th/wp-content/uploads/2022/05/Durian-online-shop-2022.jpg",
    sellerDescription:
      "Passionate in Thai durian and self-taught for more than 20 years, Li is the expert behind Durian Hao-chi, offering the finest Thai durian varieties. Known for his dedication to quality, Li ensures every durian is perfectly ripened and bursting with flavor.",
    description:
      "Durian Hao-chi specializes in offering a variety of Thai durians that are celebrated for their rich taste and creamy texture. Our selection includes the finest Mon Thong, Chanee, and more. Indulge in the king of fruits with Durian Hao-chi and experience the best of Thai durians.",
    facebook: "https://facebook.com/DurianHaoChi",
    instagram: "https://instagram.com/DurianHaoChi",
    line: "https://line.me/ti/p/~DurianHaoChi",
    storeProductType: "fruits",
    createdAt: "2024-07-03T00:00:00.000Z",
    updatedAt: "2024-07-03T00:00:00.000Z",
  },
  {
    userId: 8,
    name: "Noodi Boat",
    coverImage:
      "https://hungryinthailand.com/wp-content/uploads/2024/03/thai-boat-noodles-500x500.webp",
    sellerDescription:
      "Arthit, a noodle enthusiast and culinary expert, is the mastermind behind Noodi Boat, offering authentic boat noodles with rich, flavorful broths and tender meats. With years of experience, Arthit brings the taste of traditional Thai noodles to your table.",
    description:
      "At Noodi Boat, we specialize in traditional Thai boat noodles that are prepared with a blend of savory broths and fresh ingredients. Our food truck is dedicated to delivering the true essence of Thai street food, one bowl at a time. Come and savor the authentic flavors of Thailand's boat noodles.",
    facebook: "https://facebook.com/NoodiBoat",
    instagram: "https://instagram.com/NoodiBoat",
    line: "https://line.me/ti/p/~NoodiBoat",
    storeProductType: "noodles",
    createdAt: "2024-07-04T00:00:00.000Z",
    updatedAt: "2024-07-04T00:00:00.000Z",
  },
  {
    userId: 9,
    name: "Sawan Fruity",
    coverImage: "https://thailand.go.th/uploads/posts/the_post_1691565598.webp",
    sellerDescription:
      "Kaimook is the vibrant spirit behind Sawan Fruity, offering the freshest and most exotic Thai fruits. With a deep knowledge of local produce, Kaimook ensures that every fruit is of the highest quality and bursting with natural sweetness.",
    description:
      "Sawan Fruity is your go-to place for the freshest Thai fruits. From juicy mangoes to sweet rambutans, our selection is carefully picked to provide you with the best flavors Thailand has to offer. Visit us for a healthy and delicious fruit experience.",
    facebook: "https://facebook.com/SawanFruity",
    instagram: "https://instagram.com/SawanFruity",
    line: "https://line.me/ti/p/~SawanFruity",
    storeProductType: "fruits",
    createdAt: "2024-07-07T00:00:00.000Z",
    updatedAt: "2024-07-07T00:00:00.000Z",
  },
  {
    userId: 10,
    name: "Thai Kanom",
    coverImage:
      "https://i.pinimg.com/736x/7b/b3/2b/7bb32b5543646649802398abc134a3db.jpg",
    sellerDescription:
      "Ploychompoo is the creative force behind Thai Kanom, specializing in traditional Thai desserts that are both visually stunning and delicious. With a passion for sweets, Ploychompoo crafts each dessert with care and dedication.",
    description:
      "Thai Kanom offers a delightful array of traditional Thai desserts that are perfect for satisfying your sweet tooth. From coconut sticky rice to golden threads, our desserts are made with authentic recipes and the finest ingredients. Indulge in the sweet flavors of Thailand with Thai Kanom.",
    facebook: "https://facebook.com/ThaiKanom",
    instagram: "https://instagram.com/ThaiKanom",
    line: "https://line.me/ti/p/~ThaiKanom",
    storeProductType: "desserts",
    createdAt: "2024-07-08T00:00:00.000Z",
    updatedAt: "2024-07-08T00:00:00.000Z",
  },
  {
    userId: 11,
    name: "Zaap Namprik🌶️",
    coverImage:
      "https://www.ryoiireview.com/upload/article/202004/1585724493_995927c6a8fcc7a6a57839145df277ec.jpg",
    sellerDescription:
      "Mae-Pranee is the fiery spirit behind Zaap Chili, a brand that brings the heat of Thai cuisine to your table. Known for his exceptional Thai chili paste, her creations are a perfect blend of tradition and spice.",
    description:
      "Zaap Chili offers the finest Thai chili pastes that are packed with flavor and spice. Made with traditional recipes and the freshest ingredients, our chili pastes add an authentic Thai kick to any dish. Spice up your meals with Zaap Chili today!",
    facebook: "https://facebook.com/ZaapChili",
    instagram: "https://instagram.com/ZaapChili",
    line: "https://line.me/ti/p/~ZaapChili",
    storeProductType: "others",
    createdAt: "2024-07-09T00:00:00.000Z",
    updatedAt: "2024-07-09T00:00:00.000Z",
  },
];

//##events table
const events = [
  {
    storeProfileId: 1,
    name: "Mooping buy1 get 1 free K-Village",
    images: "https://images.deliveryhero.io/image/fd-th/LH/if5c-listing.jpg",
    location: "13.721148722919299, 100.56903744603262",
    locationName: "K Village, Rama IV",
    description:
      "Open-air, dog-friendly mall with brand-name retail stores & eateries, plus health & beauty services.",
    startDate: "2024-07-14T00:00:00.000Z",
    endDate: "2024-07-25T00:00:00.000Z",
    openTime: "2024-07-01T09:00:00.000Z",
    closingTime: "2024-07-01T17:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 1,
    name: "Mooping at Gourmet Market, Emporium",
    images:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Emporium_Bangkok_2020.jpg/1280px-Emporium_Bangkok_2020.jpg",
    location: "13.731584665979922, 100.56873525396897",
    locationName: "Emporium, Phromphong",
    description:
      "Luxe, elegant mall with a wide array of restaurants & 7 levels of upmarket stores, plus a cinema.",
    startDate: "2024-07-26T00:00:00.000Z",
    endDate: "2024-07-29T00:00:00.000Z",
    openTime: "2024-07-01T09:00:00.000Z",
    closingTime: "2024-07-01T17:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 1,
    name: "Mooping at FYI center",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.721428640588034, 100.56015410370725",
    locationName: "FYI center, Rama IV",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-30T00:00:00.000Z",
    endDate: "2024-08-01T00:00:00.000Z",
    openTime: "2024-07-01T10:00:00.000Z",
    closingTime: "2024-07-01T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 1,
    name: "Mooping Thonglor Festival at Marché Thonglor",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipO-JF53nYTXFFYJDiN2QJLd2rRV-J8KUNP0gujn=s680-w680-h510",
    location: "13.729183140453383, 100.58091758096329",
    locationName: "Marché Thonglor",
    description:
      "Marche is a multi-level shopping and restaurant center situated in the heart of Thonglor. It is home to Japanese restaurants, food carts, and Tops supermarket. ",
    startDate: "2024-08-02T00:00:00.000Z",
    endDate: "2024-08-09T00:00:00.000Z",
    openTime: "2024-07-01T10:00:00.000Z",
    closingTime: "2024-07-01T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 1,
    name: "Mooping Meet-up at Samyan Mitrtown",
    images:
      "https://archello.s3.eu-central-1.amazonaws.com/images/2023/02/08/plan-associates-samyan-mitrtown-offices-archello.1675854602.1565.jpeg",
    location: "13.734723574668813, 100.52859741903671",
    locationName: "Samyan Mitrtown",
    description:
      "Contemporary mall & student hangout with a roof terrace, global food outlets, cinema & offices.",
    startDate: "2024-08-14T00:00:00.000Z",
    endDate: "2024-08-19T00:00:00.000Z",
    openTime: "2024-07-01T10:00:00.000Z",
    closingTime: "2024-07-01T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 2,
    name: "Durian Promo at Gourmet Market, Emporium",
    images: "https://ihealzy.com/wp-content/uploads/2021/07/Durian-1.jpg",
    location: "13.731584665979922, 100.56873525396897",
    locationName: "Emporium, Phromphong",
    description:
      "Luxe, elegant mall with a wide array of restaurants & 7 levels of upmarket stores, plus a cinema.",
    startDate: "2024-07-14T00:00:00.000Z",
    endDate: "2024-07-24T00:00:00.000Z",
    openTime: "2024-07-14T10:00:00.000Z",
    closingTime: "2024-07-14T20:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 2,
    name: "Durian buy1 get 1 free K-Village",
    images:
      "https://s.isanook.com/wo/0/ud/1/9378/KVillage.jpg?ip/crop/w670h402/q80/jpg",
    location: "13.721148722919299, 100.56903744603262",
    locationName: "K Village, Rama IV",
    description:
      "Open-air, dog-friendly mall with brand-name retail stores & eateries, plus health & beauty services.",
    startDate: "2024-07-25T00:00:00.000Z",
    endDate: "2024-07-28T00:00:00.000Z",
    openTime: "2024-07-25T10:00:00.000Z",
    closingTime: "2024-07-25T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 2,
    name: "Durian at FYI center",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.721428640588034, 100.56015410370725",
    locationName: "FYI center, Rama IV",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-29T00:00:00.000Z",
    endDate: "2024-08-02T00:00:00.000Z",
    openTime: "2024-07-29T09:00:00.000Z",
    closingTime: "2024-07-29T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 2,
    name: "Durian Thonglor Festival at Marché Thonglor",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipO-JF53nYTXFFYJDiN2QJLd2rRV-J8KUNP0gujn=s680-w680-h510",
    location: "13.729183140453383, 100.58091758096329",
    locationName: "Marché Thonglor",
    description:
      "Marche is a multi-level shopping and restaurant center situated in the heart of Thonglor. It is home to Japanese restaurants, food carts, and Tops supermarket. ",
    startDate: "2024-08-04T00:00:00.000Z",
    endDate: "2024-08-11T00:00:00.000Z",
    openTime: "2024-08-04T11:00:00.000Z",
    closingTime: "2024-08-04T21:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 3,
    name: "Wagyu Boat Noodle at Marché Thonglor",
    images:
      "https://i.pinimg.com/736x/59/9f/1d/599f1ddc3490352c1ac5f37514a0b5af.jpg",
    location: "13.729183140453383, 100.58091758096329",
    locationName: "Marché Thonglor",
    description:
      "Marche is a multi-level shopping and restaurant center situated in the heart of Thonglor. It is home to Japanese restaurants, food carts, and Tops supermarket. ",
    startDate: "2024-07-14T00:00:00.000Z",
    endDate: "2024-07-24T00:00:00.000Z",
    openTime: "2024-07-14T10:00:00.000Z",
    closingTime: "2024-07-14T20:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 3,
    name: "Premium boat noodle at Gourmet Market, Emporium",
    images:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Emporium_Bangkok_2020.jpg/1280px-Emporium_Bangkok_2020.jpg",
    location: "13.731584665979922, 100.56873525396897",
    locationName: "Emporium, Phromphong",
    description:
      "Luxe, elegant mall with a wide array of restaurants & 7 levels of upmarket stores, plus a cinema.",
    startDate: "2024-07-25T00:00:00.000Z",
    endDate: "2024-07-28T00:00:00.000Z",
    openTime: "2024-07-25T10:00:00.000Z",
    closingTime: "2024-07-25T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 3,
    name: "Boat Noodle buy1 get 1 free K-Village",
    images:
      "https://s.isanook.com/wo/0/ud/1/9378/KVillage.jpg?ip/crop/w670h402/q80/jpg",
    location: "13.721148722919299, 100.56903744603262",
    locationName: "K Village, Rama IV",
    description:
      "Open-air, dog-friendly mall with brand-name retail stores & eateries, plus health & beauty services.",
    startDate: "2024-07-29T00:00:00.000Z",
    endDate: "2024-08-02T00:00:00.000Z",
    openTime: "2024-07-29T09:00:00.000Z",
    closingTime: "2024-07-29T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 3,
    name: "Healthy boat noodle at FYI center",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.721428640588034, 100.56015410370725",
    locationName: "FYI center, Rama IV",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-03T00:00:00.000Z",
    endDate: "2024-08-10T00:00:00.000Z",
    openTime: "2024-08-03T09:00:00.000Z",
    closingTime: "2024-08-03T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 4,
    name: "Fruit Tasting at Century Victory Monument",
    images:
      "https://static.bangkokpost.com/media/content/dcx/2020/03/09/3556769.jpg",
    location: "13.761880400166946, 100.5369506383687",
    locationName: "Victory Monument",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-13T00:00:00.000Z",
    endDate: "2024-07-24T00:00:00.000Z",
    openTime: "2024-07-13T09:00:00.000Z",
    closingTime: "2024-07-13T19:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 4,
    name: "Thai fruit taste at Pratunam Market",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.753914488333093, 100.54038517649487",
    locationName: "Victory Monument",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-25T00:00:00.000Z",
    endDate: "2024-07-28T00:00:00.000Z",
    openTime: "2024-07-25T09:00:00.000Z",
    closingTime: "2024-07-25T19:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 4,
    name: "Sawan Fruity is at La Villa!",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.78024730708485, 100.54515499216801",
    locationName: "Ari, Phaholyothin",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-29T00:00:00.000Z",
    endDate: "2024-07-31T00:00:00.000Z",
    openTime: "2024-07-29T10:00:00.000Z",
    closingTime: "2024-07-31T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 4,
    name: "Sawan Fruity at The Street Rachada",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.771561926743914, 100.57225532474851",
    locationName: "Rachadapisek",
    description:
      "In the heart of Bangkok, the FYI Center stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-02T00:00:00.000Z",
    endDate: "2024-08-09T00:00:00.000Z",
    openTime: "2024-08-02T11:00:00.000Z",
    closingTime: "2024-08-03T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 5,
    name: "The taste of Thailand's sweets at Siam Paragon",
    images: "https://i.ytimg.com/vi/kuRYcbo4BxU/maxresdefault.jpg",
    location: "13.746837896467335, 100.53453044602846",
    locationName: "Siam Paragon, Siam",
    description:
      "In the heart of Bangkok, Siam Paragon stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-13T00:00:00.000Z",
    endDate: "2024-07-24T00:00:00.000Z",
    openTime: "2024-07-13T09:00:00.000Z",
    closingTime: "2024-07-13T19:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 5,
    name: "Kanom Thai at Icon Siam",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.726774586529158, 100.50988984465381",
    locationName: "Krung Thonburi",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-25T00:00:00.000Z",
    endDate: "2024-08-01T00:00:00.000Z",
    openTime: "2024-08-01T11:00:00.000Z",
    closingTime: "2024-08-01T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 5,
    name: "Asiatique Kanom Festival",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.704504807129398, 100.5032673082049",
    locationName: "Charoen Krung",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-02T00:00:00.000Z",
    endDate: "2024-08-10T00:00:00.000Z",
    openTime: "2024-08-01T11:00:00.000Z",
    closingTime: "2024-08-01T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 5,
    name: "Sweets of Thai @EmQuartier",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.732059074891831, 100.56956213068464",
    locationName: "Phromphong, Wattana",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-14T00:00:00.000Z",
    endDate: "2024-08-20T00:00:00.000Z",
    openTime: "2024-08-01T10:00:00.000Z",
    closingTime: "2024-08-01T21:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 5,
    name: "Kanom Thai cluster in JODD Fairs ",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.75682684661674, 100.56693253536326",
    locationName: "Rama IX",
    description:
      "In the heart of Bangkok, JODD Fairs stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-24T00:00:00.000Z",
    endDate: "2024-08-29T00:00:00.000Z",
    openTime: "2024-08-01T10:00:00.000Z",
    closingTime: "2024-08-01T18:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 6,
    name: "Asiatique Thai Foodie Lover Festival",
    images:
      "https://www.healthychefoil.com/uploaded/recipe/thumb/210713-105344-f.jpg",
    location: "13.704504807129398, 100.5032673082049",
    locationName: "Charoen Krung",
    description:
      "In the heart of Bangkok, Siam Paragon stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-16T00:00:00.000Z",
    endDate: "2024-07-24T00:00:00.000Z",
    openTime: "2024-07-16T09:00:00.000Z",
    closingTime: "2024-07-16T19:00:00.000Z",
    isActive: true,
  },
  {
    storeProfileId: 6,
    name: "Thai Food Fest 2024 at Icon Siam",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.726774586529158, 100.50988984465381",
    locationName: "Krung Thonburi",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-07-25T00:00:00.000Z",
    endDate: "2024-08-01T00:00:00.000Z",
    openTime: "2024-08-01T11:00:00.000Z",
    closingTime: "2024-08-01T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 6,
    name: "The taste of Thailand's sweets at Siam Paragon",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.746837896467335, 100.53453044602846",
    locationName: "Siam Paragon, Siam",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-02T00:00:00.000Z",
    endDate: "2024-08-10T00:00:00.000Z",
    openTime: "2024-08-01T11:00:00.000Z",
    closingTime: "2024-08-01T20:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 6,
    name: "Exotic Thai @EmQuartier",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.732059074891831, 100.56956213068464",
    locationName: "Phromphong, Wattana",
    description:
      "In the heart of Bangkok, Icon Siam stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-14T00:00:00.000Z",
    endDate: "2024-08-20T00:00:00.000Z",
    openTime: "2024-08-01T10:00:00.000Z",
    closingTime: "2024-08-01T21:00:00.000Z",
    isActive: false,
  },
  {
    storeProfileId: 6,
    name: "Kanom Thai cluster in JODD Fairs ",
    images:
      "https://lh3.googleusercontent.com/p/AF1QipPGVe4BYIozDWru6-rQE7dyi4hT6-nqqshtrXHO=s680-w680-h510",
    location: "13.75682684661674, 100.56693253536326",
    locationName: "Rama IX",
    description:
      "In the heart of Bangkok, JODD Fairs stands out as a modern workspace that truly lives up to its name - 'For Your Inspiration'. Perfectly positioned in the city's business hub, it offers easy access to all essential services and amenities.",
    startDate: "2024-08-24T00:00:00.000Z",
    endDate: "2024-08-29T00:00:00.000Z",
    openTime: "2024-08-01T10:00:00.000Z",
    closingTime: "2024-08-01T18:00:00.000Z",
    isActive: false,
  },
];

//INTEREST TABLE
const interest = [
  { userId: 2, eventId: 1 },
  { userId: 2, eventId: 2 },
  { userId: 2, eventId: 3 },
  { userId: 3, eventId: 2 },
  { userId: 3, eventId: 3 },
  {
    userId: 4,
    eventId: 4,
  },
  {
    userId: 5,
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
    name: "Standard Moo-ping (Regular pork skewer)",
    description:
      "Savor the authentic flavors of Thailand with our Standard Moo-ping.",
    image: "https://thethaiger.com/wp-content/uploads/2024/05/Moo-Ping.jpg",
    price: 15,
    unit: "Piece",
  },
  {
    storeProfileId: 1,
    name: "Moo-ping Nomsod (Milk Steamed Thai Pork Skewer)",
    description:
      " Tender pork marinated in a milk-based mixture and steamed to succulent perfection. ",
    image:
      "https://i.pinimg.com/originals/e6/c6/24/e6c624ac9b19f1b8a4da23fed604e652.jpg",
    price: 15,
    unit: "Piece",
  },
  {
    storeProfileId: 1,
    name: "American BBQ Skewer",
    description:
      "Juicy pork pieces are slathered in a smoky, tangy BBQ sauce and grilled until caramelized, offering a perfect balance of sweet and savory flavors.",
    image:
      "https://m.media-amazon.com/images/I/71svAFFqTuS._AC_UF894,1000_QL80_.jpg",
    price: 20,
    unit: "Piece",
  },
  {
    storeProfileId: 1,
    name: "Chicken Teriyaki Skewer",
    description:
      "Tender chicken chunks are marinated in a rich teriyaki sauce, then grilled to achieve a glossy, flavorful glaze that pairs perfectly with any side dish.",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-3f6e1b30542d8612577a247c781daf23",
    price: 20,
    unit: "Piece",
  },
  {
    storeProfileId: 1,
    name: "Moo-yor Skewer (Vietnamese Sausage)",
    description:
      "This Vietnamese sausage, made from finely ground pork and spices, is grilled to bring out its unique taste and succulent texture, perfect as an appetizer or snack.",
    image:
      "https://greatcurryrecipes.net/wp-content/uploads/2022/06/sau2-720x540.jpg",
    price: 25,
    unit: "Piece",
  },
  {
    storeProfileId: 2,
    name: "Kradum Thong Durian (กระดุมทอง)",
    description:
      "Kradum Thong durian is one of the most authentic varieties of durian from Thailand.",
    image: "https://statics.vinwonders.com/vietnamese-durian-01_1708501488.jpg",
    price: 120,
    unit: "KG",
  },
  {
    storeProfileId: 2,
    name: "Monthong Durian (หมอนทอง)",
    description:
      'Mon Thong is the most important and famous durian variety of Thailand. It means "golden pillow" in Thai.',
    image:
      "https://img.jakpost.net/c/2019/03/04/2019_03_04_66805_1551684342._large.jpg",
    price: 180,
    unit: "KG",
  },
  {
    storeProfileId: 2,
    name: "Chanee Durian (ชะนี)",
    description:
      "Chanee durians are a small to medium-sized varietal, averaging 20 to 25 centimeters in length and 18 to 22 centimeters in width, and have an oval appearance.",
    image:
      "https://i0.wp.com/www.yearofthedurian.com/wp-content/uploads/2018/05/P1012143-1.jpg?fit=4608%2C3456&ssl=1",
    price: 150,
    unit: "KG",
  },
  {
    storeProfileId: 2,
    name: "Kanyao Durian (ก้านยาว)",
    description:
      "Kan Yao is a medium to large varietal, generally weighing between 2 - 4.5 kg, and have a distinct round appearance with a long, thick, and fibrous stem, averaging 10 - 14 cm in length.",
    image:
      "https://thethaiger.com/wp-content/uploads/2023/05/fresh-durian-durio-zibthinus-murray-sack-old-wood-background-king-fruit-from-thailand-summer-season.jpg",
    price: 120,
    unit: "KG",
  },
  {
    storeProfileId: 3,
    name: "Beef Ball and Sliced Beef (ก๋วยเตี๋ยวเรือลูกชิ้นเนื้อ)",
    description:
      "A rich and flavorful noodle soup featuring tender beef balls and thinly sliced beef in a savory broth.",
    image:
      "https://i.pinimg.com/originals/0e/3b/61/0e3b61b4ab76fe2e0534e4b5dbb9ecd7.jpg",
    price: 120,
    unit: "Bowl",
  },
  {
    storeProfileId: 3,
    name: "Pork Ball and Sliced Pork (ก๋วยเตี๋ยวเรือลูกชิ้นหมู)",
    description:
      "A delicious noodle soup with juicy pork balls and slices of succulent pork in a hearty broth.",
    image:
      "https://www.matichonweekly.com/wp-content/uploads/2019/05/%E0%B8%96%E0%B8%99%E0%B8%B1%E0%B8%945-1.jpg",
    price: 100,
    unit: "Bowl",
  },
  {
    storeProfileId: 3,
    name: "Chicken Noodle Soup (ก๋วยเตี๋ยวเรือไก่)",
    description:
      "A comforting bowl of noodle soup with tender chicken pieces in a flavorful and aromatic broth.",
    image:
      "https://fit-d.com/uploads/food/b765f45ff66c459c9efaa5b64fc25a2f.jpg",
    price: 90,
    unit: "Bowl",
  },
  {
    storeProfileId: 3,
    name: "Mixed Seafood Noodle (ก๋วยเตี๋ยวเรือทะเล)",
    description:
      "An enticing noodle soup with a variety of seafood including shrimp, squid, and fish, all in a rich, flavorful broth.",
    image:
      "https://www.ryoiireview.com/upload/article/202203/1646821806_f3ccdd27d2000e3f9255a7e3e2c48800.jpg",
    price: 150,
    unit: "Bowl",
  },
  {
    storeProfileId: 3,
    name: "Vegetarian Boat Noodle (ก๋วยเตี๋ยวเรือมังสวิรัติ)",
    description:
      "A wholesome and satisfying noodle soup featuring tofu, mushrooms, and assorted vegetables in a savory broth.",
    image:
      "https://t1.blockdit.com/photos/2021/02/602d55625b89c80bb83ac0e1_800x0xcover_3LC34n0N.jpg",
    price: 80,
    unit: "Bowl",
  },
  {
    storeProfileId: 4,
    name: "Rambutan",
    description:
      "A tropical fruit known for its hairy skin and sweet, juicy flesh. Rambutan is rich in vitamin C and antioxidants.",
    image:
      "https://parade.com/.image/t_share/MTkwNTc5NTIwNTYzNTIxNDA0/rambutan-ftr.jpg",
    price: 20,
    unit: "Bag",
  },
  {
    storeProfileId: 4,
    name: "Mango",
    description:
      "A juicy, sweet fruit with a vibrant yellow flesh. Mangoes are packed with vitamins A and C, making them a healthy and delicious snack.",
    image: "https://i.ebayimg.com/images/g/nlYAAOSwYzVls6KE/s-l1200.webp",
    price: 50,
    unit: "Bag",
  },
  {
    storeProfileId: 4,
    name: "Roseapple",
    description:
      "A crisp and refreshing fruit with a mild, sweet flavor. Roseapples are low in calories and high in fiber, making them a perfect healthy treat.",
    image:
      "https://archives1.dailynews.lk/sites/default/files/news/2020/01/19/z_p32-Rose-01.jpg",
    price: 30,
    unit: "Bag",
  },
  {
    storeProfileId: 4,
    name: "Mangosteen",
    description:
      "Often referred to as the 'queen of fruits,' mangosteen has a sweet and tangy flavor with a juicy, fragrant flesh. It's known for its high antioxidant content.",
    image:
      "https://plantskingdom.in/cdn/shop/products/1_0e400297-5897-4be8-a549-e177bb5f4f4a_1024x1024.jpg?v=1657427340",
    price: 60,
    unit: "Bag",
  },
  {
    storeProfileId: 4,
    name: "Santol",
    description:
      "A tropical fruit with a thick rind and a sweet, tangy pulp. Santol is often enjoyed fresh or used in traditional Thai dishes.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/021/147/252/small/half-santol-on-wood-background-famous-fruit-of-lopburi-province-thailand-photo.jpg",
    price: 40,
    unit: "Bag",
  },
  {
    storeProfileId: 4,
    name: "Guava",
    description:
      "A nutrient-dense fruit with a sweet and slightly tart flavor. Guava is rich in dietary fiber, vitamin C, and antioxidants, making it a healthy choice.",
    image:
      "https://cdn.thenewsroom.io/platform/posters/7cf8b9c1-f882-11ed-bdb3-cc580da24447/d57729b681f7-.jpg",
    price: 25,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Kluay (ขนมกล้วย)",
    description:
      "A traditional Thai dessert made from mashed bananas, coconut milk, and rice flour, steamed to perfection. It has a soft and chewy texture with a naturally sweet flavor.",
    image: "https://i.ytimg.com/vi/kuRYcbo4BxU/maxresdefault.jpg",
    price: 35,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Bueng (ขนมเบื้อง)",
    description:
      "Crispy Thai crepes filled with sweet or savory toppings such as shredded coconut, egg yolk, and mung beans. A delightful snack with a satisfying crunch.",
    image:
      "https://www.bhankanomthai.com/media/resized/media/jmslideshow/4-Kanom%20Bueng_820_410.jpg",
    price: 45,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Chan (ขนมชั้น)",
    description:
      "Layered Thai dessert made from tapioca flour and coconut milk, known for its colorful layers and chewy texture. It's mildly sweet and very aromatic.",
    image:
      "https://i.pinimg.com/564x/58/20/1e/58201e791708d4ead6232b90a2f136ea.jpg",
    price: 50,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Krok (ขนมครก)",
    description:
      "A popular Thai street food made from rice flour and coconut milk, cooked in a special pan to create small, round pancakes. They are crispy on the outside and soft inside.",
    image: "https://www.kanomkrok.com/images/basket.jpg",
    price: 40,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Ja Mongkut (จ่ามงกุฎ)",
    description:
      "An intricately designed Thai dessert made from egg yolks, mung bean flour, and sugar. It has a rich, sweet flavor and is often served during special occasions.",
    image:
      "https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Dara_Thong2.jpg/640px-Dara_Thong2.jpg&w=640&q=50",
    price: 55,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Tuay (ขนมถ้วย)",
    description:
      "A traditional Thai dessert made from rice flour, coconut milk, and palm sugar, served in small ceramic cups. It has a creamy texture and a sweet, aromatic taste.",
    image:
      "https://img.wongnai.com/p/1920x0/2020/03/03/47053d1fd7cc4109b407cb7a42e80fc3.jpg",
    price: 30,
    unit: "Bag",
  },
  {
    storeProfileId: 5,
    name: "Kanom Thom (ขนมต้ม)",
    description:
      "A coconut-filled dessert made from glutinous rice flour, rolled into balls and boiled, then coated with grated coconut. It's chewy and has a deliciously sweet filling.",
    image:
      "https://img.wongnai.com/p/1920x0/2018/03/30/df2f09b24fe044a4b2633803565d7655.jpg",
    price: 35,
    unit: "Bag",
  },
  {
    storeProfileId: 6,
    name: "Namprik Noom (น้ำพริกหนุ่ม)",
    description:
      "A northern Thai chili paste made from grilled green chilies, garlic, and shallots, pounded together to create a flavorful and spicy dip.",
    image: "https://live.staticflickr.com/7216/7219959430_5a866970a9_b.jpg",
    price: 110,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Ong (น้ำพริกอ่อง)",
    description:
      "A northern Thai chili paste made with minced pork, tomatoes, and dried chilies. It's a savory and mildly spicy dip commonly served with fresh vegetables.",
    image:
      "https://img.wongnai.com/p/1968x0/2017/09/24/c415bbcecc5145c9a967b132e28a1087.jpg",
    price: 120,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Narok (น้ำพริกนรก)",
    description:
      "Known as 'Hell Chili Paste,' this intensely spicy paste is made from dried chilies, shrimp paste, and garlic. It's perfect for those who love extreme heat.",
    image:
      "https://www.tcijthai.com/office-tcij/headpicture/sDgSK73Fri74503.jpg",
    price: 130,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Goongsiab (น้ำพริกกุ้งเสียบ)",
    description:
      "A flavorful chili paste made with sun-dried shrimp, garlic, and chilies. It has a unique smoky flavor and is delicious with rice or vegetables.",
    image: "https://www.sgethai.com/wp-content/uploads/2022/08/narok001.webp",
    price: 140,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Plara (น้ำพริกปลาร้า)",
    description:
      "A traditional Thai chili paste made from fermented fish, dried chilies, and herbs. It has a strong aroma and a rich, savory flavor.",
    image:
      "https://s359.kapook.com/r/600/auto/pagebuilder/f3c3361e-aa25-4093-ace9-ecc287e6d8a5.jpg",
    price: 115,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Pladukfoo (น้ำพริกปลาดุกฟู)",
    description:
      "This chili paste is made with crispy catfish and a blend of chilies and herbs. It has a crunchy texture and a spicy, savory taste.",
    image: "https://i.ytimg.com/vi/C-4ChyX-hEM/maxresdefault.jpg",
    price: 125,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Longrua (น้ำพริกลงเรือ)",
    description:
      "A rich and complex chili paste made with fermented shrimp, chilies, and a variety of herbs. It's known for its depth of flavor and is often eaten with rice.",
    image: "https://i.ytimg.com/vi/1R2SXviOP_4/maxresdefault.jpg",
    price: 135,
    unit: "Bottle",
  },
  {
    storeProfileId: 6,
    name: "Namprik Maengda (น้ำพริกแมงดา)",
    description:
      "A unique chili paste made with giant water beetles, chilies, and garlic. It has a distinctive flavor and is considered a delicacy in Thai cuisine.",
    image:
      "https://filebroker-cdn.lazada.co.th/kf/Sb5419d3985e245589cdcf6b7f715c6e53.jpg",
    price: 150,
    unit: "Bottle",
  },
];
const eventItem = [
  { eventId: 1, productId: 1 },
  { eventId: 1, productId: 5 },
  { eventId: 2, productId: 1 },
  { eventId: 2, productId: 2 },
  { eventId: 2, productId: 3 },
  { eventId: 2, productId: 4 },
  { eventId: 3, productId: 1 },
  { eventId: 3, productId: 2 },
  { eventId: 3, productId: 4 },
  { eventId: 4, productId: 5 },
  { eventId: 4, productId: 2 },
  { eventId: 4, productId: 1 },
  { eventId: 5, productId: 1 },
  { eventId: 5, productId: 2 },
  { eventId: 5, productId: 3 },
  { eventId: 5, productId: 4 },
  { eventId: 5, productId: 5 },
  { eventId: 6, productId: 6 },
  { eventId: 6, productId: 7 },
  { eventId: 6, productId: 8 },
  { eventId: 6, productId: 9 },
  { eventId: 7, productId: 6 },
  { eventId: 7, productId: 7 },
  { eventId: 7, productId: 8 },
  { eventId: 7, productId: 9 },
  { eventId: 8, productId: 6 },
  { eventId: 8, productId: 7 },
  { eventId: 8, productId: 8 },
  { eventId: 8, productId: 9 },
  { eventId: 9, productId: 6 },
  { eventId: 9, productId: 7 },
  { eventId: 9, productId: 8 },
  { eventId: 9, productId: 9 },
];
const voucherList = [
  {
    eventId: 1,
    code: "KVILJULY24",
    description:
      "Come with your loved one for buying one mooping to get another mooping for both FREE!",
    condition:
      "This promo is only applicable for maximum 2 persons (including the main buyer) at K-Village.",
    totalAmount: 200,
    discount: 10,
    image:
      "https://hungryinthailand.com/wp-content/uploads/2023/07/moo-ping-768x1024.webp",
  },
  {
    eventId: 2,
    code: "MOOPING16",
    description: "Present the coupon to get the 15% discount!",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 200,
    discount: 99,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/11/4b/e1/47/getlstd-property-photo.jpg",
  },
  {
    eventId: 3,
    code: "PORK8LOVER",
    description: "Buy one mooping with your loved one to get free skewer.",
    condition:
      "The coupon bearer must bring the partner at the actual event to redeem the benefit of this coupon.",
    totalAmount: 200,
    discount: 99,
    image:
      "https://hungryinthailand.com/wp-content/uploads/2023/04/moo-ping-at-a-street-food-market-1-1.webp",
  },
  {
    eventId: 4,
    code: "EMPOPRO24",
    description:
      "Redeem your coupon at the Foodie festival in Emporium Department Store.",
    condition:
      "This coupon can be used at the booth in front of Gourmet market of Emporium only.",
    totalAmount: 150,
    discount: 20,
    image:
      "https://www.marionskitchen.com/wp-content/uploads/2023/05/Thai-Moo-Ping-18.jpg",
  },
  {
    eventId: 5,
    code: "FYIPROMO20",
    description: "Tech foodies get ginormous freebies from this event!",
    condition:
      "If you work in the tech company, you can provide us your name card. You will get another 15% top up discount along with this coupon.",
    totalAmount: 100,
    discount: 50,
    image:
      "https://bkkfoodie.com/wp-content/uploads/2020/11/72777579_149268829751922_5928412172336763776_n.jpg",
  },
  {
    eventId: 6,
    code: "DURIAN24",
    description: "Present this coupon to get 10% discount",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 100,
    discount: 10,
    image:
      "https://i0.wp.com/www.yearofthedurian.com/wp-content/uploads/2013/06/P6014213-1-4.jpg?resize=640%2C480",
  },
  {
    eventId: 7,
    code: "SUPER50OFF",
    description: "Get 50% OFF presenting this coupon to the seller.",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 300,
    discount: 50,
    image:
      "https://news.cgtn.com/news/3d3d414f306b545a326c4754/img/179a5ef3-3247-48c2-aad7-92b2ed814ed3.jpg",
  },
  {
    eventId: 8,
    code: "BUY1GET1F",
    description: "Bring your friend to our event and get another one for FREE!",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 150,
    discount: 10,
    image:
      "https://www.afoodieworld.com/wp-content/uploads/2024/07/Hong-Kongs-largest-Malaysian-durian-festival-returns-to-Hotel-ICON-from-Jul.-20-to-Aug.-24-1024x683.jpg",
  },
  {
    eventId: 9,
    code: "DURIAN88",
    description: "8.8 Promo - 100 THB discount if buying more than 500 THB",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 200,
    discount: 25,
    image:
      "https://moneyandbanking.co.th/wp-content/uploads/2023/06/robinhood-durian.jpg",
  },
  {
    eventId: 10,
    code: "DURIAN88",
    description: "8.8 Promo - 100 THB discount if buying more than 500 THB",
    condition:
      "This coupon can be used only 1 time and cannot be shared to any third parties.",
    totalAmount: 200,
    discount: 25,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 11,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 12,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 13,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 14,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 15,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 16,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 17,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 18,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 19,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 20,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 21,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 22,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 23,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 24,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 25,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 26,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
  {
    eventId: 27,
    code: "XXXXX24",
    description: "description description description description",
    condition: "condition condition condition condition condition condition.",
    totalAmount: 999,
    discount: 99,
    image: "https://picsum.photos/400",
  },
];
const voucherItem = [
  { voucherListId: 1, storeProfileId: 1, userId: 2 },
  { voucherListId: 1, storeProfileId: 1, userId: 3 },
  { voucherListId: 1, storeProfileId: 1, userId: 4 },
  { voucherListId: 1, storeProfileId: 1, userId: 5 },
  { voucherListId: 2, storeProfileId: 1, userId: 2 },
  { voucherListId: 2, storeProfileId: 1, userId: 3 },
  { voucherListId: 2, storeProfileId: 1, userId: 4 },
  { voucherListId: 2, storeProfileId: 1, userId: 5 },
  { voucherListId: 3, storeProfileId: 1, userId: 2 },
  { voucherListId: 4, storeProfileId: 1, userId: 3 },
  { voucherListId: 5, storeProfileId: 1, userId: 4 },
  { voucherListId: 5, storeProfileId: 1, userId: 5 },
  { voucherListId: 6, storeProfileId: 2, userId: 2 },
  { voucherListId: 6, storeProfileId: 2, userId: 3 },
  { voucherListId: 6, storeProfileId: 2, userId: 4 },
  { voucherListId: 6, storeProfileId: 2, userId: 5 },
  { voucherListId: 7, storeProfileId: 2, userId: 2 },
  { voucherListId: 7, storeProfileId: 2, userId: 4 },
  { voucherListId: 8, storeProfileId: 2, userId: 4 },
  { voucherListId: 9, storeProfileId: 2, userId: 5 },
  { voucherListId: 10, storeProfileId: 3, userId: 2 },
  { voucherListId: 10, storeProfileId: 3, userId: 3 },
  { voucherListId: 10, storeProfileId: 3, userId: 4 },
  { voucherListId: 10, storeProfileId: 3, userId: 5 },
  { voucherListId: 11, storeProfileId: 3, userId: 2 },
  { voucherListId: 11, storeProfileId: 3, userId: 4 },
  { voucherListId: 12, storeProfileId: 3, userId: 2 },
  { voucherListId: 12, storeProfileId: 3, userId: 4 },
  { voucherListId: 13, storeProfileId: 3, userId: 3 },
  { voucherListId: 13, storeProfileId: 3, userId: 5 },
  { voucherListId: 14, storeProfileId: 4, userId: 2 },
  { voucherListId: 14, storeProfileId: 4, userId: 3 },
  { voucherListId: 14, storeProfileId: 4, userId: 4 },
  { voucherListId: 14, storeProfileId: 4, userId: 5 },
  { voucherListId: 15, storeProfileId: 4, userId: 2 },
  { voucherListId: 15, storeProfileId: 4, userId: 3 },
  { voucherListId: 16, storeProfileId: 4, userId: 3 },
  { voucherListId: 16, storeProfileId: 4, userId: 5 },
  { voucherListId: 17, storeProfileId: 4, userId: 2 },
  { voucherListId: 17, storeProfileId: 4, userId: 4 },
  { voucherListId: 18, storeProfileId: 5, userId: 3 },
  { voucherListId: 18, storeProfileId: 5, userId: 5 },
  { voucherListId: 19, storeProfileId: 5, userId: 2 },
  { voucherListId: 19, storeProfileId: 5, userId: 4 },
  { voucherListId: 20, storeProfileId: 5, userId: 2 },
  { voucherListId: 20, storeProfileId: 5, userId: 3 },
  { voucherListId: 21, storeProfileId: 5, userId: 2 },
  { voucherListId: 21, storeProfileId: 5, userId: 3 },
  { voucherListId: 21, storeProfileId: 5, userId: 4 },
  { voucherListId: 21, storeProfileId: 5, userId: 5 },
  { voucherListId: 22, storeProfileId: 5, userId: 6 },
  { voucherListId: 22, storeProfileId: 5, userId: 7 },
  { voucherListId: 22, storeProfileId: 5, userId: 8 },
  { voucherListId: 22, storeProfileId: 5, userId: 9 },
  { voucherListId: 23, storeProfileId: 6, userId: 2 },
  { voucherListId: 23, storeProfileId: 6, userId: 3 },
  { voucherListId: 23, storeProfileId: 6, userId: 4 },
  { voucherListId: 23, storeProfileId: 6, userId: 5 },
  { voucherListId: 24, storeProfileId: 6, userId: 2 },
  { voucherListId: 24, storeProfileId: 6, userId: 3 },
  { voucherListId: 25, storeProfileId: 6, userId: 4 },
  { voucherListId: 25, storeProfileId: 6, userId: 5 },
  { voucherListId: 26, storeProfileId: 6, userId: 7 },
  { voucherListId: 26, storeProfileId: 6, userId: 8 },
  { voucherListId: 27, storeProfileId: 6, userId: 9 },
  { voucherListId: 27, storeProfileId: 6, userId: 10 },
];
const follow = [
  { storeProfileId: 1, userId: 2 },
  { storeProfileId: 1, userId: 3 },
  { storeProfileId: 1, userId: 4 },
  { storeProfileId: 1, userId: 5 },
  { storeProfileId: 1, userId: 7 },
  { storeProfileId: 1, userId: 8 },
  { storeProfileId: 1, userId: 9 },
  { storeProfileId: 1, userId: 10 },
  { storeProfileId: 2, userId: 2 },
  { storeProfileId: 2, userId: 3 },
  { storeProfileId: 2, userId: 4 },
  { storeProfileId: 2, userId: 5 },
  { storeProfileId: 2, userId: 6 },
  { storeProfileId: 2, userId: 8 },
  { storeProfileId: 2, userId: 9 },
  { storeProfileId: 2, userId: 10 },
  { storeProfileId: 2, userId: 11 },
  { storeProfileId: 3, userId: 2 },
  { storeProfileId: 3, userId: 3 },
  { storeProfileId: 3, userId: 4 },
  { storeProfileId: 3, userId: 5 },
  { storeProfileId: 3, userId: 6 },
  { storeProfileId: 3, userId: 7 },
  { storeProfileId: 3, userId: 9 },
  { storeProfileId: 3, userId: 10 },
  { storeProfileId: 4, userId: 2 },
  { storeProfileId: 4, userId: 3 },
  { storeProfileId: 4, userId: 4 },
  { storeProfileId: 4, userId: 5 },
  { storeProfileId: 4, userId: 6 },
  { storeProfileId: 4, userId: 7 },
  { storeProfileId: 4, userId: 9 },
  { storeProfileId: 4, userId: 10 },
  { storeProfileId: 4, userId: 11 },
  { storeProfileId: 5, userId: 2 },
  { storeProfileId: 5, userId: 3 },
  { storeProfileId: 5, userId: 4 },
  { storeProfileId: 5, userId: 5 },
  { storeProfileId: 5, userId: 6 },
  { storeProfileId: 5, userId: 7 },
  { storeProfileId: 5, userId: 8 },
  { storeProfileId: 5, userId: 9 },
  { storeProfileId: 5, userId: 11 },
  { storeProfileId: 6, userId: 2 },
  { storeProfileId: 6, userId: 3 },
  { storeProfileId: 6, userId: 4 },
  { storeProfileId: 6, userId: 5 },
  { storeProfileId: 6, userId: 6 },
  { storeProfileId: 6, userId: 7 },
  { storeProfileId: 6, userId: 8 },
  { storeProfileId: 6, userId: 9 },
  { storeProfileId: 6, userId: 10 },
];
const comment = [
  {
    storeProfileId: 1,
    userId: 2,
    topic: "หมูปิ้งที่ดีที่สุดที่เคยทาน",
    comment:
      " สั่งมาลองแล้วติดใจเลยค่ะ หมูปิ้งรสชาติกลมกล่อม หอมกลิ่นถ่านอ่อนๆ ทานกับน้ำจิ้มแจ่วแล้วสุดยอดมากค่ะ จะสั่งอีกแน่นอน",
    rate: "FIVE",
    isVerify: true,
  },
  {
    storeProfileId: 1,
    userId: 3,
    topic: "美味しいムーピン",
    comment:
      "タイのムーピンを初めて食べましたが、とても美味しかったです。甘さと香ばしさのバランスが完璧で、ジューシーなお肉がたまりません。また食べたいです！",
    rate: "FIVE",
  },
  {
    storeProfileId: 1,
    userId: 4,
    topic: "Delicious Thai Pork Skewers",
    comment:
      "I was blown away by the flavor of these Thai pork skewers. The meat was incredibly tender and had the perfect balance of sweet and savory. Reminds me of the street food I had in Thailand. Will definitely order again!",
    rate: "FIVE",
  },
  {
    storeProfileId: 1,
    userId: 8,
    topic: "หมูปิ้งที่เคยทาน รสชาติมาตรฐาน",
    comment:
      "หมูปิ้งรสชาติพอใช้ได้ หอมกลิ่นถ่านนิดหน่อย ทานกับน้ำจิ้มแจ่วก็โอเคคครับ",
    rate: "THREE",
  },
  {
    storeProfileId: 1,
    userId: 7,
    topic: "非常美味的泰式烤猪肉",
    comment:
      "这款泰式烤猪肉真是让我惊艳，口感非常好，肉质鲜嫩，味道甜而不腻。吃起来有种特别的香味，真的很喜欢！",
    rate: "FIVE",
  },
  {
    storeProfileId: 2,
    userId: 2,
    topic: "ทุเรียนที่อร่อยที่สุด",
    comment:
      "สั่งทุเรียนจากร้านนี้แล้วประทับใจมากค่ะ ทุเรียนสด หอม หวาน มันทุกลูกค่ะ จะกลับมาซื้ออีกแน่นอน",
    rate: "FIVE",
  },
  {
    storeProfileId: 2,
    userId: 4,
    topic: "Disappointed with the Durian",
    comment:
      "The durians I received were not fresh and lacked the creamy texture I was expecting. Some were overripe and others were under ripe. Not worth the price.",
    rate: "TWO",
  },
  {
    storeProfileId: 2,
    userId: 5,
    topic: "最高のドリアン",
    comment:
      "この店のドリアンは本当に素晴らしいです。新鮮でクリーミーで、完熟しています。また注文します！",
    rate: "FIVE",
    isVerify: true,
  },
  {
    storeProfileId: 2,
    userId: 8,
    topic: "最佳榴莲",
    comment:
      "从这家店订购的榴莲质量非常好。榴莲新鲜，香甜，奶油般的口感。一定会再次订购！",
    rate: "FIVE",
    isVerify: true,
  },
  {
    storeProfileId: 3,
    userId: 2,
    topic: "น้ำซุปเข้มข้น รสชาติกลมกล่อม",
    comment:
      "น้ำซุปของที่นี่เข้มข้นมาก รสชาติกลมกล่อมไม่เหมือนที่อื่นเลยค่ะ เส้นนุ่มกำลังดี จะต้องมาซ้ำแน่นอนค่ะ",
    rate: "FIVE",
  },
  {
    storeProfileId: 3,
    userId: 6,
    topic: "บริการยอดเยี่ยม อาหารอร่อย",
    comment:
      "พนักงานบริการดีมาก อาหารก็อร่อยทุกเมนูเลยค่ะ แนะนำให้ทุกคนมาลองทานดูนะคะ",
    rate: "FOUR",
  },
  {
    storeProfileId: 3,
    userId: 4,
    topic: "Delicious and Authentic",
    comment:
      "The boat noodles here are simply amazing! The flavors are authentic and the ingredients are fresh. Definitely coming back for more!",
    rate: "FIVE",
  },
  {
    storeProfileId: 3,
    userId: 3,
    topic: "Great Taste, Great Service",
    comment:
      "Loved the rich taste of the broth and the tender noodles. The service was also top-notch. A must-visit for noodle lovers.",
    rate: "FIVE",
  },
  {
    storeProfileId: 3,
    userId: 7,
    topic: "Good but Could Be Better",
    comment:
      "The noodles were tasty, but the portion size was a bit small for the price. Still, a nice place to enjoy boat noodles.",
    rate: "THREE",
  },
  {
    storeProfileId: 3,
    userId: 8,
    topic: "Perfect for a Quick Meal",
    comment:
      "If you're in a hurry and want something delicious, this is the place to go. The boat noodles are fantastic and served quickly.",
    rate: "FOUR",
  },
  {
    storeProfileId: 3,
    userId: 9,
    topic: "A Hidden Gem",
    comment:
      "Stumbled upon this place by accident and was pleasantly surprised. The boat noodles were flavorful and the atmosphere was cozy. Will return for sure!",
    rate: "FIVE",
  },
  {
    storeProfileId: 4,
    userId: 2,
    topic: "Juicy and Fresh Rambutan",
    comment:
      "The rambutan here is always incredibly juicy and fresh. Perfect for a quick, healthy snack!",
    rate: "FIVE",
  },
  {
    storeProfileId: 4,
    userId: 4,
    topic: "Sweet and Ripe Mangoes",
    comment:
      "I love the mangoes from this seller. They're always perfectly ripe and bursting with flavor. Great for smoothies or eating on their own.",
    rate: "FIVE",
  },
  {
    storeProfileId: 4,
    userId: 5,
    topic: "Delicious Mangosteen",
    comment:
      "The mangosteen here is top-notch. Sweet, tangy, and so fresh. Definitely my go-to for a tropical treat.",
    rate: "FOUR",
  },
  {
    storeProfileId: 4,
    userId: 6,
    topic: "Unique and Flavorful Santol",
    comment:
      "If you haven't tried santol before, you must get it from this seller. It's unique and incredibly flavorful. A delightful surprise!",
    rate: "FIVE",
  },
  {
    storeProfileId: 4,
    userId: 7,
    topic: "Crisp and Fresh Guava",
    comment:
      "The guava here is always so crisp and fresh. It's perfect for snacking or adding to fruit salads. Highly recommend!",
    rate: "FOUR",
  },
  {
    storeProfileId: 4,
    userId: 11,
    topic: "Refreshing Roseapple",
    comment:
      "The roseapples are incredibly refreshing and have a wonderful crunch. They're a must-try if you want something light and tasty.",
    rate: "FIVE",
  },
  {
    storeProfileId: 5,
    userId: 2,
    topic: "Delicious Kanom Kluay",
    comment:
      "The Kanom Kluay here is simply amazing! It's perfectly sweet and has a great banana flavor. A wonderful treat any time of the day.",
    rate: "FIVE",
  },
  {
    storeProfileId: 5,
    userId: 4,
    topic: "Crispy and Sweet Kanom Bueng",
    comment:
      "The Kanom Bueng from this seller is delightful. The crispy shells and sweet filling are just perfect. Highly recommend!",
    rate: "FIVE",
  },
  {
    storeProfileId: 5,
    userId: 6,
    topic: "Best Kanom Krok",
    comment:
      "These Kanom Krok are the best I've ever had. They're crispy on the outside and creamy on the inside. Simply delicious!",
    rate: "FIVE",
  },
  {
    storeProfileId: 5,
    userId: 7,
    topic: "Tasty Kanom Thom",
    comment:
      "The Kanom Thom here is so tasty! The coconut filling is just right and the texture is perfect. A real treat!",
    rate: "FOUR",
  },
  {
    storeProfileId: 5,
    userId: 8,
    topic: "Elegant Ja Mongkut",
    comment:
      "The Ja Mongkut is not only beautiful but also delicious. The intricate design and the delicate taste make it a perfect dessert.",
    rate: "FIVE",
  },
  {
    storeProfileId: 5,
    userId: 10,
    topic: "Smooth and Sweet Kanom Chan",
    comment:
      "I love the Kanom Chan from this seller. The layers are smooth and the sweetness is just right. Perfect for any occasion.",
    rate: "FOUR",
  },
];

const inboxMessageUser = [
  {
    userIdSender: 1,
    userIdReceiver: 2,
    topic: "Server will be in maintenance on 1 August 2024.",
    message:
      "Please be informed in advance that the server will be under maintenance from 01:00 until 04:00 on the 1st of August 2024. Sorry for your inconveniences.",
  },
  {
    userIdSender: 1,
    userIdReceiver: 3,
    topic: "เปิดร้านใหม่",
    message:
      "สำหรับลูกค้าที่มาซื้อที่หน้าร้านเรา ใช้คูปองลดเพ่ิ่มได้อีก20% ลดแล้วก็จะลดอีก มีครั้งนี้ครั้งเดียว มาอุดหนุนกันด้วยนะจ้าาาา",
  },
  {
    userIdSender: 1,
    userIdReceiver: 4,
    topic: "Special Discount on Gourmet Foods!",
    message:
      "Hello our endearing customers, to thank you for your loyalty, we're offering a 10% discount on all gourmet foods this weekend. Use code GOURMET10 at checkout. Enjoy the best gourmet experience!",
  },
  {
    userIdSender: 2,
    userIdReceiver: 4,
    topic: "特別割引のご案内",
    message:
      "こんにちは&#33; 当店では今週末にすべてのスイーツが20%オフになります。コード SWEET20 を使用して、甘いお菓子をお楽しみください。",
  },
  {
    userIdSender: 2,
    userIdReceiver: 6,
    topic: "新鲜水果特惠",
    message:
      "为感谢您的支持&#44;我们提供所有新鲜水果20%的折扣。本周使用代码FRUIT20享受优惠。不要错过这个机会&#33;",
  },
];

const report = [
  {
    userIdReporter: 4,
    storeProfileReported: 2,
    subject: "Durian is overriped and squishy",
    message:
      "The seller told me that the quality of his Durian is top-notch. Not worth paying indeed. I won't buy it again!",
    image:
      "https://i0.wp.com/www.yearofthedurian.com/wp-content/uploads/2012/11/Tekkaraub3-2.jpg?resize=640%2C480",
  },
  {
    userIdReporter: 2,
    storeProfileReported: 8,
    subject: "Boat noodle is so pricey, considering its quality",
    message:
      "I do not find the taste of boat noodle here so special. The price per bowl is way too costly! ",
    image:
      "https://thumbs.dreamstime.com/z/dry-boat-noodles-pork-thai-street-food-guay-dtieow-reua-moo-naam-dtok-thin-rice-ball-liver-topped-dark-soy-sauce-30978330.jpg",
  },
  {
    userIdReporter: 3,
    storeProfileReported: 11,
    subject: "The quality of the chili is off!",
    message:
      "I had the diarrhea after having had this chili paste. It was not a good experience at all!",
    image:
      "https://www.eatingthaifood.com/wp-content/uploads/2018/12/recipe-nam-prik-goong-sot.jpg",
  },
];

// const run = async () => {
//   await prisma.users.createMany({ data: userData });
//   await prisma.storeProfile.createMany({ data: storeProfile });
//   await prisma.events.createMany({ data: events });
//   await prisma.interest.createMany({ data: interest });
//   await prisma.product.createMany({ data: product });
//   await prisma.eventItem.createMany({ data: eventItem });
//   await prisma.voucherList.createMany({ data: voucherList });
//   await prisma.voucherItem.createMany({ data: voucherItem });
//   await prisma.follow.createMany({ data: follow });
//   await prisma.comment.createMany({ data: comment });
//   await prisma.inboxMessageUser.createMany({ data: inboxMessageUser });
//   await prisma.report.create({ data: report });
// };
// run();

const run = async () => {
  console.log("Start seeding...");

  try {
    await prisma.users.createMany({ data: userData });
    console.log("Users seeded.");

    await prisma.storeProfile.createMany({ data: storeProfile });
    console.log("Store profiles seeded.");

    await prisma.events.createMany({ data: events });
    console.log("Events seeded.");

    await prisma.interest.createMany({ data: interest });
    console.log("Interests seeded.");

    await prisma.product.createMany({ data: product });
    console.log("Products seeded.");

    await prisma.eventItem.createMany({ data: eventItem });
    console.log("Event items seeded.");

    await prisma.voucherList.createMany({ data: voucherList });
    console.log("Voucher lists seeded.");

    await prisma.voucherItem.createMany({ data: voucherItem });
    console.log("Voucher items seeded.");

    await prisma.follow.createMany({ data: follow });
    console.log("Follows seeded.");

    await prisma.comment.createMany({ data: comment });
    console.log("Comments seeded.");

    await prisma.inboxMessageUser.createMany({ data: inboxMessageUser });
    console.log("Inbox message users seeded.");

    await prisma.report.create({ data: report });
    console.log("Report seeded.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Seeding finished.");
  }
};

run();
