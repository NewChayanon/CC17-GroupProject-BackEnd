const prisma = require('../models/prisma')

adminService = {}

//find
adminService.getAllBuyerAndSeller = () => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"},{role : "SELLER" }]
  }
});

adminService.getSeller = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "SELLER" }]
  },
  data
});

adminService.getBuyer = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"}]
  },
  data: data
});

//update

adminService.updateBlock = (id, isBlocked) => prisma.users.update({
  where:{
    id: id
  },
  data:{
    isBlocked: isBlocked
  }
});


//notification

  //create

  adminService.createMessage = (data)=> prisma.inboxMessageAdmin.create({data})

  // find
  adminService.getAllMessages = (topic,message) => prisma.inboxMessageAdmin.findMany({
    where:{
      topic: topic,
      message: message
    }
  });

  // update 
  adminService.editMessages = (id,topic,message) => prisma.inboxMessageAdmin.update({
    where:{
      id:1
    },
    data:{
      topic: topic,
      message: message
   },
    select:{
      id: true
   }
  });

  //delete
  adminService.deleteMessageById = (id,data) => prisma.inboxMessageAdmin.delete({
    where:{
      id:id
    },
    data:data
  });


module.exports = adminService;