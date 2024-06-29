const prisma = require("../models/prisma");

const followService = {};

followService.findManyFavoriteByUserId = (userId) =>
  prisma.follow.findMany({ where: { userId } });

module.exports = followService;
