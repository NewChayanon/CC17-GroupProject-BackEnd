const prisma = require("../models/prisma");

const inboxMessageUserService = {};

// find
inboxMessageUserService.findInboxMessageById = (id) => prisma.inboxMessageUser.findFirst({ where: { id } });
inboxMessageUserService.findInboxMessageByUserIdSender = (userIdSender) =>
  prisma.inboxMessageUser.findFirst({ where: { userIdSender }, select: { userIdSender: true, topic: true, message: true, createdAt: true } });
inboxMessageUserService.findInboxMessageByUserIdReceiver = (userIdReceiver) =>
  prisma.inboxMessageUser.findMany({ where: { userIdReceiver }, select: { id: true, userIdSender: true, topic: true, message: true, createdAt: true } });

// create
inboxMessageUserService.createManyMessageByData = (data) => prisma.inboxMessageUser.createMany({data})

// delete
inboxMessageUserService.removeInboxMessageByInboxId = (id) => prisma.inboxMessageUser.delete({ where: { id } });

// update
inboxMessageUserService.readMessage = (id, isRead) =>
  prisma.inboxMessageUser.update({
    where: { id: id },
    data: { isRead: isRead },
  });

module.exports = inboxMessageUserService;
