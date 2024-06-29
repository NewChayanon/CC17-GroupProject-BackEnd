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

  //create
  adminService.createMessage = (data)=> prisma.inboxMessageAdmin.create({data})


module.exports = adminService;