const prisma = require("../models/prisma");

const voucherListService = {};

voucherListService.updateDiscountByEventId = (id, data) =>
  prisma.voucherList.update({ where: { id }, data });

module.exports = voucherListService;
