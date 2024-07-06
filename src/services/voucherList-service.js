const prisma = require("../models/prisma");

const voucherListService = {};

voucherListService.updateDiscountByEventId = (id, data) =>
  prisma.voucherList.update({ where: { id }, data });

voucherListService.findFirstVoucherListByEventId = (eventId) =>
  prisma.voucherList.findFirst({ where: { eventId } });

voucherListService.deleteManyVoucherListByEventId = (eventId) =>
  prisma.voucherList.deleteMany({ where: { eventId } });

module.exports = voucherListService;
