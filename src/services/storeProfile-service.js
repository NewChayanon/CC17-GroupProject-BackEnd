const prisma = require("../models/prisma");

const storeProfileService = {};

storeProfileService.findManyStoreProfileByStoreProfileId = (storeProfileId) =>
  prisma.storeProfile.findMany({
    where: { OR: storeProfileId },
    include: { Follow: true, Events: true, VoucherItem: true, user: true },
});


//seller
 // find

storeProfileService.findStoreProfileByUserId = (storeProfileId) =>
  prisma.storeProfile.findFirst({
    where:{userId: storeProfileId}
  })


 // create
storeProfileService.createStoreProfile = (data) =>
  prisma.storeProfile.create({data}

  );




module.exports = storeProfileService;
