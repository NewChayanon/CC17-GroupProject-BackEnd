const prisma = require("../models/prisma")

const userService = {}

userService.findUserId = (id) => prisma.users.findUnique({where:{id}})
userService.findEmail = (email) => prisma.users.findUnique({where:{email}})

module.exports = userService