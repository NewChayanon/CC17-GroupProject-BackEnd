const prisma = require("../models/prisma");

const inboxMessageUserService = {};

inboxMessageUserService.findManyInboxMessageByUserId = (userIdReceiver) =>
  prisma.inboxMessageUser.findMany({ where: { userIdReceiver } });

inboxMessageUserService.findInboxMessageById = (id) =>
  prisma.inboxMessageUser.findFirst({ where: { id } });

inboxMessageUserService.removeInboxMessageByInboxId = (id) =>
  prisma.inboxMessageUser.delete({ where: { id } });
module.exports = inboxMessageUserService;
