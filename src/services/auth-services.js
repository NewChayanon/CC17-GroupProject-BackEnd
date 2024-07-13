const prisma = require("../models/prisma");
const authService = {};

// create user
authService.createUser = (data) => prisma.users.create({ data });

// find user
authService.findUserByEmail = (email) =>
  prisma.users.findFirst({
    where: { email: email },
  });

authService.findUserById = (userId) =>
  prisma.users.findFirst({
    where: { id: userId },
  });

authService.findEmailByEmail = (email) =>
  prisma.users.findUnique({
    where: { email: email },
    select: { email: true },
  });
// update
authService.updatePasswordByEmail = (email, data) =>
  prisma.users.update({
    where: {
      email: email,
    },
    select:{
      email: true,
      password: true
    },
    data: {
      password: data,
    },
  });

module.exports = authService;
