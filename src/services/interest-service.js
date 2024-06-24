const prisma = require("../models/prisma")

const interestService = {}

interestService.findInterestByUserId = (userId) => prisma.interest.findMany({ where: { userId }, include: { event: { include: { storeProfile: true } } } })

module.exports = interestService