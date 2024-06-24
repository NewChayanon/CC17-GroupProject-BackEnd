const prisma = require("../models/prisma")

const userService = {}

userService.findById = (id) => prisma.users.findUnique({where:{id}})

module.exports = userService