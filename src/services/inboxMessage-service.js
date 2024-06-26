const prisma = require("../models/prisma");

const inboxMessageService = {};

inboxMessageService.findManyInboxMessageByUserId = (userIdReceiver) =>
  prisma.inboxMessage.findMany({ where: { userIdReceiver } });

inboxMessageService.findInboxMessageById = (id) =>
  prisma.inboxMessage.findFirst({ where: { id } });

inboxMessageService.removeInboxMessageByInboxId = (id) =>
  prisma.inboxMessage.delete({ where: { id } });
module.exports = inboxMessageService;
