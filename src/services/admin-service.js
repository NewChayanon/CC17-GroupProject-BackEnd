const { provisioning } = require("../config/cloudinary");
const prisma = require("../models/prisma");

adminService = {};

//find
adminService.getAllBuyerAndSeller = () =>
  prisma.users.findMany({
    where: {
      OR: [{ role: "BUYER" }, { role: "SELLER" }],
    },
  });

adminService.getSeller = (pages, pageSize, sortBy) =>
  prisma.users.findMany({
    where: {
      role: "SELLER",
    },
    select: {
      StoreProfile: {
        select: { id: true , name:true},

      },
      id: true,
      profileImage: true,
      email: true,
      displayName: true,
      isBlocked: true,
      updatedAt: true,
    },
    orderBy: sortBy === "createdAt" ? { createdAt: "desc" } : { id: "asc" },
    skip: (pages - 1) * pageSize,
    take: pageSize,
  });

adminService.getBuyer = async (pages, pageSize, sortBy) => {
  const result = await prisma.users.findMany({
    where: {
      OR: [{ role: "BUYER" }, { role: "SELLER" }],
    },
    select: {
      StoreProfile: {
        select: { id: true },
      },
      id: true,
      profileImage: true,
      displayName: true,
      email: true,
      isBlocked: true,
      updatedAt: true,
    },
    orderBy: sortBy === "createdAt" ? { createdAt: "desc" } : { id: "asc" },
    skip: (pages - 1) * pageSize,
    take: pageSize,
  });
  return result.map((el) => {
    const { displayName, ...rest } = el;
    return { ...rest, username: displayName };
  });
};

adminService.getAllReport = (pages, pageSize,sortBy)=> prisma.report.findMany({
  select: {
    user:{
      select:{
        displayName: true,
      },
    },
    storeProfile:{
      select:{
        name:true
      },
    },
    id: true,
    storeProfileReported:true,
    userIdReporter: true,
    subject: true,
    message:true,
    image: true,
    createdAt: true,
  },
  orderBy: sortBy === "createdAt" ? { createdAt: "desc" } : { id: "asc" },
    skip: (pages - 1) * pageSize,
    take: pageSize
})

//update

adminService.updateBlock = (id, isBlocked) =>
  prisma.users.update({
    where: {
      id: id,
    },
    data: {
      isBlocked: isBlocked,
    },
  });

//notification

//create

adminService.createMessage = (data) => prisma.inboxMessageAdmin.create({ data });

// find

adminService.findMessage = (id) => prisma.inboxMessageAdmin.findUnique({ where: { id } });

adminService.getAllMessages = (topic, message) =>
  prisma.inboxMessageAdmin.findMany({
    where: {
      topic: topic,
      message: message,
    },
    skip: 0,
    take: 10,
  });

// update
adminService.editMessages = (id, topic, message) =>
  prisma.inboxMessageAdmin.update({
    where: {
      id: 1,
    },
    data: {
      topic: topic,
      message: message,
    },
    select: {
      id: true,
    },
    skip: 0,
    take: 10,
  });

//delete
adminService.deleteMessageById = (id, data) =>
  prisma.inboxMessageAdmin.delete({
    where: {
      id: id,
    },
    data: data,
  });



module.exports = adminService;
