const prisma = require("../models/prisma");

const storeProfileService = {};

storeProfileService.findManyStoreProfileByStoreProfileId = (storeProfileId) =>
  prisma.storeProfile.findMany({
    where: { OR: storeProfileId },
    include: { Follow: true, Events: true, VoucherItem: true, user: true },
  });

module.exports = storeProfileService;
