const prisma = require("../models/prisma");
const eventServices = {};

// find
eventServices.countActive = () => prisma.events.count({ where: { isActive: true } });
eventServices.countIsActive = () => prisma.events.count({ where: { isActive: false } });
eventServices.findEventByEventId = (eventId) =>
  prisma.events.findUnique({
    where: { id: eventId },
    include: {
      VoucherList: { include: { VoucherItem: true } },
      EventItem: { include: { products: true } },
      storeProfile: { include: { user: true } },
    },
  });
eventServices.findEventByEventIdAndUserId = (eventId, userId) =>
  prisma.events.findUnique({
    where: { id: eventId },
    include: {
      VoucherList: { include: { VoucherItem: true } },
      EventItem: { include: { products: true } },
      storeProfile: { include: { user: true } },
      Interest: { where: { AND: [{ userId }, { eventId }] } },
    },
  });
eventServices.findManyEventByStoreId = (storeId, eventId, userId) =>
  prisma.events.findMany({
    where: { AND: [{ storeProfileId: storeId }, { id: { not: eventId } }] },
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
eventServices.findEventsByStoreProfileId = (storeProfileId) =>
  prisma.events.findMany({
    where: { storeProfileId: storeProfileId },
    include: {
      Interest: { select: { eventId: true } },
      storeProfile: { select: { name: true } },
    },
  });
eventServices.findUniqueEventByIdAndStoreProfileId = (id, storeProfileId) => prisma.events.findUnique({ where: { id, storeProfileId } });
eventServices.findFirstEventByEventIdAndStoreProfileId = (id, storeProfileId) => prisma.events.findFirst({ where: { id, storeProfileId } });
eventServices.findFirstEventById = (id) => prisma.events.findFirst({ where: { id } });
eventServices.findManyEventByStoreProfileId = (storeProfileId) => prisma.events.findMany({ where: { storeProfileId } });
eventServices.findManyEventSelectIdAndLocation = () => prisma.events.findMany({ select: { id: true, location: true } });
eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInStoreProfileId = (storeProfileId) =>
  prisma.events.findMany({
    where: { storeProfileId: { in: storeProfileId } },
    include: {
      storeProfile: {
        include: {
          user: true,
          Follow: true,
          Events: true,
          VoucherItem: true,
        },
      },
      VoucherList: { include: { VoucherItem: true } },
    },
  });
eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInId = (id) =>
  prisma.events.findMany({
    where: { id: { in: id } },
    include: {
      storeProfile: {
        include: {
          user: true,
          Follow: true,
          Events: true,
          VoucherItem: true,
        },
      },
      VoucherList: { include: { VoucherItem: true } },
    },
  });
eventServices.findManyEventsByDateAndIsActiveIsFalse = (DateToday) => prisma.events.findMany({ where: { AND: [{ startDate: DateToday }, { isActive: false }] } });
eventServices.findManyEventIdAndByDateAndIsActiveIsTrue = (DateToday) =>
  prisma.events.findMany({
    where: { AND: [{ startDate: DateToday }, { isActive: true }] },
    select: { id: true, Interest: true, storeProfile: { select: { userId: true, Follow: true } }, VoucherList: { select: { VoucherItem: true } } },
  });

// group by
eventServices.groupByEventByStoreId = (storeProfileId) =>
  prisma.events.groupBy({
    by: ["storeProfileId"],
    where: { storeProfileId: { in: storeProfileId } },
    _count: { storeProfileId: true },
  });

// create
eventServices.createEventsByStoreProfileId = (data) => prisma.events.create({ data });

// update
eventServices.updateEventByIdAndData = (id, data) => prisma.events.update({ where: { id }, data });
eventServices.updateManyIsActiveIsTrueInId = (id) => prisma.events.updateMany({ where: { id: { in: id } }, data: { isActive: true } });

// delete
eventServices.deleteEventById = (id) => prisma.events.delete({ where: { id } });

module.exports = eventServices;
