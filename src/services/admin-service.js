const prisma = require('../models/prisma')

adminService = {}

//find
adminService.getAllBuyerAndSeller = () => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"},{role : "SELLER" }]
  },
  orderBy:{
    createdAt: 'desc',
    id: 'asc'
  }
});

adminService.getSeller = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "SELLER" }]
  },
  orderBy:{
    createdAt: 'desc',
    id: 'asc'
  },
  skip:0,
  take:10,
  data
});

adminService.getBuyer = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"}]
  },
  orderBy:{
    createdAt: 'desc',
    id: 'asc'
  },
  skip:0,
  take:10,
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
    },
    skip:0,
    take:10
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
   },
    skip:0,
    take:10
  });

  //delete
  adminService.deleteMessageById = (id,data) => prisma.inboxMessageAdmin.delete({
    where:{
      id:id
    },
    data:data
  });


module.exports = adminService;