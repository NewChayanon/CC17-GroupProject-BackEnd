const prisma = require("../models/prisma");

const voucherListService = {};
// find
voucherListService.findFirstVoucherListByEventId = (eventId) =>
  prisma.voucherList.findFirst({ where: { eventId } });
voucherListService.findManyVoucherListAndEventAndStoreProfileByEventId = (
  eventId
) =>
  prisma.voucherList.findMany({
    where: { eventId: { in: eventId } },
    include: {
      event: {
        select: {
          name: true,
          startDate: true,
          endDate: true,
          storeProfile: { select: { name: true } },
        },
      },
    },
  });

  // create
voucherListService.createVoucherListByData = (data) =>
  prisma.voucherList.create({ data });

// update
voucherListService.updateDiscountByEventId = (id, data) =>
  prisma.voucherList.update({ where: { id }, data });

// delete
voucherListService.deleteManyVoucherListByEventId = (eventId) =>
  prisma.voucherList.deleteMany({ where: { eventId } });

module.exports = voucherListService;
