const prisma = require("../models/prisma");

const followService = {};

// find
followService.findManyFavoriteByUserId = (userId) => prisma.follow.findMany({ where: { userId } });
followService.findFollowByUserIdAndStoreProfileId = (userId, storeProfileId) => prisma.follow.findFirst({ where: { AND: [{ userId }, { storeProfileId }] } });
followService.findManyUserIdFollowerByStoreProfileId = (storeProfileId) => prisma.follow.findMany({ where: { storeProfileId } });
followService.findManyFollowByStoreProfileId = (storeProfileId) => prisma.follow.findMany({ where: { storeProfileId } });
followService.findManyFollowAndUserAndStoreProfileAndEventByStoreProfileId = (storeProfileId) =>
  prisma.follow.findMany({
    where: { storeProfileId },
    include: {
      user: {
        select: {
          id: true,
          profileImage: true,
          displayName: true,
          firstName: true,
          lastName: true,
          StoreProfile: {
            include: {
              Follow: { select: { id: true } },
              Events: true,
              VoucherItem: { select: { id: true } },
            },
          },
        },
      },
    },
  });

// create
followService.createFollowByUserIdAndStoreProfileId = (userId, storeProfileId) => prisma.follow.create({ data: { userId, storeProfileId } });

// delete
followService.deleteFollowById = (id) => prisma.follow.delete({ where: { id } });

// group by
followService.groupByFollowByStoreProfileId = (storeProfileId) =>
  prisma.follow.groupBy({
    by: ["storeProfileId"],
    where: { storeProfileId },
    _count: { storeProfileId: true },
  });

module.exports = followService;
