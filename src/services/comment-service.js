const prisma = require("../models/prisma");

const commentService = {};

commentService.createCommentByData = (data) => prisma.comment.create({ data });

module.exports = commentService;
