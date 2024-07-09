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

// delete
eventItemService.deleteManyEventItemByEventId = (eventId) =>
  prisma.eventItem.deleteMany({ where: { eventId } });
eventItemService.deleteManyEventItemByProductId = (productId) =>
  prisma.eventItem.deleteMany({ where: { productId } });

module.exports = eventItemService;
