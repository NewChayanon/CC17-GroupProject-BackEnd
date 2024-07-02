const prisma = require("../models/prisma")

const userService = {}

userService.findUserId = (id) => prisma.users.findUnique({where:{id}})
userService.findEmail = (email) => prisma.users.findUnique({where:{email}})

userService.updateStatus = (id,role ,statusMessage) => prisma.users.update({
  where:{
    id: id
  },
  data:{
    statusMessage: statusMessage,
    role:role
  }
});

userService.getPublicNotification = () => prisma.inboxMessageAdmin.findMany();

userService.updateCoverImageById = (userId,data) => prisma.storeProfile.update({
  where:{
    userId: userId,
  },
  data:data
  
})

//future

// userService.checkUserGetNotificationStatusByUserId = (userId) => prisma.users.findUnique({
  // where: {
  //   AND:[{isBlocked: false},{statusMessage: false},],
  //   OR : [{role : "BUYER"},{role : "SELLER" }],
  //   topic: title,
  //   message:message
  // },
  // select: {
  //   id: true
  // }
// }); 

module.exports = userService