const prisma = require("../models/prisma");

const eventServices = {};

eventServices.findEventByEventId = (eventId) =>
  prisma.events.findUnique({
    where: { id: eventId },
    include: {
      VoucherList: true,
      EventItem: true,
      storeProfile: { include: { user: true } },
    },
  });

eventServices.findManyEventByStoreId = (storeId, userId) =>
  prisma.events.findMany({
    where: { id: storeId },
    include: { Interest: { where: { userId: userId } } },
  });

module.exports = eventServices;
