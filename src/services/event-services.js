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

eventServices.findAllEventByIsActive = () =>
  prisma.events.findMany({
    where: { isActive: true },
    include: {
      storeProfile: {
        include: { user: true, Follow: true },
      },
      VoucherList: { include: { VoucherItem: true } },
    },
  });

eventServices.findManyVoucherItemByStoreId = async (storeProfileId) => {
  let result = await Promise.all(storeProfileId.map(async (el) => {
    let arr = await prisma.events.findMany({
      where: { storeProfileId: el.storeProfileId },
    });
    
    return arr;
  }))
  
  return result;
};

module.exports = eventServices;
