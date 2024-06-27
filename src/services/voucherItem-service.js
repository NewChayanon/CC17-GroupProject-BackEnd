const prisma = require("../models/prisma");

const voucherItemService = {};

voucherItemService.groupByVoucherItemByStoreId = (storeProfileId) =>
  prisma.voucherItem.groupBy({
    by: ["storeProfileId"],
    where:{storeProfileId:{in:storeProfileId}},
    _count: { storeProfileId: true },
  });

module.exports = voucherItemService;
