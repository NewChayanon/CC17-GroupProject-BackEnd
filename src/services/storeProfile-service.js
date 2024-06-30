const prisma = require("../models/prisma");

const storeProfileService = {};

storeProfileService.findManyStoreProfileByStoreProfileId = (storeProfileId) =>
  prisma.storeProfile.findMany({
    where: { OR: storeProfileId },
    include: { Follow: true, Events: true, VoucherItem: true, user: true },
  });

storeProfileService.findStoreProfileByStoreProfileId = (id) =>
  prisma.storeProfile.findFirst({
    where: { id },
    include: {
      user: { select: { profileImage: true, firstName: true, lastName: true } },
      Follow: { select: { userId: true } },
      Events: { select: { id: true } },
      VoucherItem: { select: { id: true } },
      Comment: {
        include: { user: { select: { firstName: true, lastName: true } } },
      },
    },
  });

module.exports = storeProfileService;
