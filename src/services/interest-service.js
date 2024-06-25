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
//
module.exports = interestService;
