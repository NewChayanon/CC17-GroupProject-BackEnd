const prisma = require("../models/prisma");

const voucherItemService = {};

// find
voucherItemService.findVoucherItemByUserIdAnd = (voucherListId, storeProfileId, userId) =>
  prisma.voucherItem.findFirst({
    where: { AND: [{ voucherListId }, { storeProfileId }, { userId }] },
  });
voucherItemService.findManyVoucherItemByUserId = (userId) =>
  prisma.voucherItem.findMany({
    where: { userId },
    include: {
      storeProfile: { select: { name: true } },
      voucherList: {
        select: {
          condition: true,
          description: true,
          image: true,
          code: true,
          event: { select: { name: true, startDate: true, endDate: true } },
        },
      },
    },
  });
voucherItemService.findVoucherItemByUserIdAndVoucherItemId = (where) => prisma.voucherItem.findUnique({ where });
voucherItemService.findUserIdAtVoucherItemByStoreProfileId = (storeProfileId) => prisma.voucherItem.findMany({ where: { storeProfileId } });
voucherItemService.findManyVoucherItemByStoreProfile = (storeProfileId) => prisma.voucherItem.findMany({ where: { storeProfileId } });

// group by
voucherItemService.groupByVoucherItemByStoreId = (storeProfileId) =>
  prisma.voucherItem.groupBy({
    by: ["storeProfileId"],
    where: { storeProfileId: { in: storeProfileId } },
    _count: { storeProfileId: true },
  });

// create
voucherItemService.createVoucherItemByVoucherListIdAndStoreProfileIdAndUserId = (voucherListId, storeProfileId, userId) =>
  prisma.voucherItem.create({
    data: { voucherListId, storeProfileId, userId },
  });

// update
voucherItemService.updateVoucherItemByIdAndUserId = (where, data) => prisma.voucherItem.update({ where, data });

// delete
voucherItemService.deleteManyVoucherItemByVoucherListId = (voucherListId) => prisma.voucherItem.deleteMany({ where: { voucherListId } });

module.exports = voucherItemService;
