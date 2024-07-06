const prisma = require("../models/prisma");

const commentService = {};

// find
commentService.findManyCommentAndUserByStoreProfileId = (storeProfileId) =>
  prisma.comment.findMany({
    where: { storeProfileId },
    include: { user: { select: { firstName: true, lastName: true } } },
  });

// create
commentService.createCommentByData = (data) => prisma.comment.create({ data });

module.exports = commentService;
