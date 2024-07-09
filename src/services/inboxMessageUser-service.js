const prisma = require("../models/prisma");

const inboxMessageUserService = {};

inboxMessageUserService.findManyInboxMessageByUserId = (userIdReceiver) =>
  prisma.inboxMessageUser.findMany({ where: { userIdReceiver } });

inboxMessageUserService.findInboxMessageById = (id) =>
  prisma.inboxMessageUser.findFirst({ where: { id } });

inboxMessageUserService.removeInboxMessageByInboxId = (id) =>
  prisma.inboxMessageUser.delete({ where: { id } });

inboxMessageUserService.findInboxMessageByUserIdSender = (userIdSender) =>
  prisma.inboxMessageUser.findFirst({ where: { userIdSender },select:{userIdSender:true,topic:true, message:true, createdAt:true} });

inboxMessageUserService.findInboxMessageByUserIdReceiver = (userIdReceiver)=>
  prisma.inboxMessageUser.findMany({ where: { userIdReceiver },select:{id:true, userIdSender:true,topic:true, message:true, createdAt:true} });

inboxMessageUserService.readMessage = (id,isRead) => prisma.inboxMessageUser.update({
  where:{
    id:id
  },
   data:{
    isRead: isRead
  }
});

module.exports = inboxMessageUserService;
