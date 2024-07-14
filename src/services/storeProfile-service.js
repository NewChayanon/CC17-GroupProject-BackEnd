const prisma = require("../models/prisma");

const storeProfileService = {};

// find
storeProfileService.findManyStoreProfileByStoreProfileId = (storeProfileId) =>
  prisma.storeProfile.findMany({
    where: { OR: storeProfileId },
    include: { Follow: true, Events: true, VoucherItem: true, user: true },
  });
storeProfileService.findStoreProfileByUserId = (userId) =>
  prisma.storeProfile.findFirst({
    where: { userId: userId },
    include: {
      Events: true,
      Product: true,
      Follow:true,
      user: { select: { profileImage: true, firstName: true, lastName: true } },
    },
  });
storeProfileService.findStoreProfileById = (id) => prisma.storeProfile.findFirst({ where: { id } });
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
storeProfileService.findFirstStoreProfileById = (id) => prisma.storeProfile.findFirst({ where: { id } });
storeProfileService.findFirstStoreProfileAndUserAndFollowAndEventAndVoucherItemAndProductById = (id) =>
  prisma.storeProfile.findFirst({
    where: { id },
    include: {
      user: true,
      Follow: true,
      Events: true,
      VoucherItem: true,
      Product: true,
    },
  });
storeProfileService.findManyStoreProfileSelectIdAndName = () => prisma.storeProfile.findMany({ select: { id: true, name: true } });

// create
storeProfileService.createStoreProfile = (data) => prisma.storeProfile.create({ data });

// update
storeProfileService.updateStoreProfileByIdAndData = (id, data) => prisma.storeProfile.update({ where: { id }, data });

module.exports = storeProfileService;
