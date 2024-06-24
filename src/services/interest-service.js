const prisma = require("../models/prisma");

const interestService = {};

interestService.findInterestByUserId = (userId) =>
    prisma.interest.findMany({
        where: { userId },
        include: {
            event: { include: { storeProfile: { include: { user: true } } } },
        },
    });
//
module.exports = interestService;
