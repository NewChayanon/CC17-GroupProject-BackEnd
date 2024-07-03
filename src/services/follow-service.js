const prisma = require("../models/prisma");

const followService = {};

followService.findManyFavoriteByUserId = (userId) =>
  prisma.follow.findMany({ where: { userId } });

followService.findFollowByUserIdAndStoreProfileId = (userId, storeProfileId) =>
  prisma.follow.findFirst({ where: { AND: [{ userId }, { storeProfileId }] } });

followService.createFollowByUserIdAndStoreProfileId = (
  userId,
  storeProfileId
) => prisma.follow.create({ data: { userId, storeProfileId } });

followService.deleteFollowById = (id) =>
  prisma.follow.delete({ where: { id } });

followService.groupByFollowByStoreProfileId = (storeProfileId) =>
  prisma.follow.groupBy({
    by: ["storeProfileId"],
    where: { storeProfileId },
    _count: { storeProfileId: true },
  });

module.exports = followService;
