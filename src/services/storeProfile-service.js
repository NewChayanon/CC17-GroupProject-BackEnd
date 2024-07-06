const prisma = require("../models/prisma");

const storeProfileService = {};

storeProfileService.findManyStoreProfileByStoreProfileId = (storeProfileId) =>
  prisma.storeProfile.findMany({
    where: { OR: storeProfileId },
    include: { Follow: true, Events: true, VoucherItem: true, user: true },
  });

//seller
// find

storeProfileService.findStoreProfileByUserId = (userId) =>
  prisma.storeProfile.findFirst({
    where: { userId: userId },
    include: {
      Events: true,
      user: { select: { profileImage: true, firstName: true, lastName: true } },
    },
  });

// create
storeProfileService.createStoreProfile = (data) =>
  prisma.storeProfile.create({ data });

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

storeProfileService.findStoreProfileById = (id) =>
  prisma.storeProfile.findFirst({ where: { id } });

module.exports = storeProfileService;
