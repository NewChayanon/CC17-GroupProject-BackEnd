const prisma = require("../models/prisma")

const userService = {}

userService.findUserId = (id) => prisma.users.findUnique({where:{id}})
userService.findEmail = (email) => prisma.users.findUnique({where:{email}})


userService.getPublicNotification = () => prisma.indoxMessageAdmin.findMany();



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