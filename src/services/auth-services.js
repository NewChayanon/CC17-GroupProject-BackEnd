const prisma = require('../models/prisma')
const authService = {}

// create user
authService.createUser = (data) => prisma.users.create({data});

// find user 
authService.findUserByEmail = (email) => prisma.users.findFirst({
  where: { email : email}
});

authService.findUserById = (userId) => prisma.users.findFirst({
  where: { id : userId}
})

module.exports = authService;


