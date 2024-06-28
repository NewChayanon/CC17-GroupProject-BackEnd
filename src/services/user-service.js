const prisma = require("../models/prisma")

const userService = {}

userService.findUserId = (id) => prisma.users.findUnique({where:{id}})
userService.findEmail = (email) => prisma.users.findUnique({where:{email}})

userService.getAllBuyerAndSeller = () => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"},{role : "SELLER" }]
  }
});

userService.getSeller = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "SELLER" }]
  },
  data
});

userService.getBuyer = (data) => prisma.users.findMany({
  where:{
    OR : [{role : "BUYER"}]
  },
  data: data
});

module.exports = userService