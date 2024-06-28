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

module.exports = voucherItemService;
