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
})

//create notification
adminService.createMessage = (message,title) => prisma.indoxMessage.create({
  where:{
    AND: [{message:message, topic: title}]
  }
});

module.exports = adminService;