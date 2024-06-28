const prisma = require('../models/prisma')

adminService = {}



//update

adminService.updateBlock = (id, isBlocked) => prisma.users.update({
  where:{
    id: id
  },
  data:{
    isBlocked: isBlocked
  }
});

adminService.updateStatus = (id, statusMessage) => prisma.users.update({
  where:{
    id: id
  },
  data:{
    statusMessage: statusMessage
  }
});


//notification

  // find
adminService.getNotification = (title, message) => prisma.users.findMany({
  where: {
    AND:[{isBlocked: false},{statusMessage: false},],
    OR : [{role : "BUYER"},{role : "SELLER" }],
    topic: title,
    message:message
  },
  select: {
    id: true
  }
});

  //create
  adminService.createMessage = (data)=> prisma.inboxMessage.create({data})


module.exports = adminService;