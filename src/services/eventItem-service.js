const prisma = require("../models/prisma");

const eventItemService = {};

eventItemService.findFirstByEventIdAndProductId = (where) =>
  prisma.eventItem.findFirst({
    where,
  });

// create
eventItemService.createEventItemByEventIdAndProductId = (data) =>
  prisma.eventItem.create({ data, include: { products: true } });
eventItemService.createManyEventItemByData = (data) =>
  prisma.eventItem.createMany({ data });

eventItemService.deleteManyEventItemByEventId = (eventId) =>
  prisma.eventItem.deleteMany({ where: { eventId } });

module.exports = eventItemService;
