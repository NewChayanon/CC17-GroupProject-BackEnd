const prisma = require("../models/prisma");

const inboxMessageService = {};

inboxMessageService.findManyInboxMessageByUserId = (userIdReceiver) =>
  prisma.inboxMessage.findMany({ where: { userIdReceiver } });

module.exports = inboxMessageService;
