const prisma = require("../models/prisma");

const eventItemService = {};

eventItemService.findFirstByEventIdAndProductId = (where) =>
  prisma.eventItem.findFirst({
    where,
  });

eventItemService.createEventItemByEventIdAndProductId = (data) =>
  prisma.eventItem.create({ data, include: { products: true } });

module.exports = eventItemService;
