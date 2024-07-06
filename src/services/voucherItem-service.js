const prisma = require("../models/prisma");

const voucherItemService = {};

voucherItemService.groupByVoucherItemByStoreId = (storeProfileId) =>
  prisma.voucherItem.groupBy({
    by: ["storeProfileId"],
    where: { storeProfileId: { in: storeProfileId } },
    _count: { storeProfileId: true },
  });

voucherItemService.findVoucherItemByUserIdAnd = (
  voucherListId,
  storeProfileId,
  userId
) =>
  prisma.voucherItem.findFirst({
    where: { AND: [{ voucherListId }, { storeProfileId }, { userId }] },
  });

voucherItemService.createVoucherItemByVoucherListIdAndStoreProfileIdAndUserId =
  (voucherListId, storeProfileId, userId) =>
    prisma.voucherItem.create({
      data: { voucherListId, storeProfileId, userId },
    });

voucherItemService.findManyVoucherItemByUserId = (userId) =>
  prisma.voucherItem.findMany({
    where: { userId },
    include: {
      storeProfile: { select: { name: true } },
      voucherList: {
        select: {
          condition: true,
          code: true,
          event: { select: { name: true, startDate: true, endDate: true } },
        },
      },
    },
  });

voucherItemService.updateVoucherItemByIdAndUserId = (where, data) =>
  prisma.voucherItem.update({ where, data });

voucherItemService.findVoucherItemByUserIdAndVoucherItemId = (where) =>
  prisma.voucherItem.findUnique({ where });

voucherItemService.deleteManyVoucherItemByVoucherListId = (voucherListId) =>
  prisma.voucherItem.deleteMany({ where: { voucherListId } });

voucherItemService.findUserIdAtVoucherItemByStoreProfileId = (storeProfileId)=>
  prisma.voucherItem.findMany({where:{storeProfileId}})

module.exports = voucherItemService;
