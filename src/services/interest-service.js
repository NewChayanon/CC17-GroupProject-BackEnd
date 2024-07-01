const prisma = require("../models/prisma");

const interestService = {};

interestService.findInterestByUserId = (userId) =>
  prisma.interest.findMany({
    where: { userId },
    include: {
      event: {
        include: {
          storeProfile: { include: { user: true } },
          VoucherList: { include: { VoucherItem: true } },
        },
      },
    },
  });

interestService.findInterestedByUserIdAndEventId = (userId, eventId) =>
  prisma.interest.findFirst({ where: { AND: [{ userId }, { eventId }] } });

interestService.deleteInterestById = (id) =>
  prisma.interest.delete({ where: { id } });        

interestService.createInterestByUserIdAndEventId = (userId, eventId) =>
  prisma.interest.create({ data: { userId, eventId } });

module.exports = interestService;
