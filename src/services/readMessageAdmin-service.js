const prisma = require("../models/prisma");

const readMessageAdmin ={}

readMessageAdmin.createUserReadMessage =(data)=> prisma.readMessageAdmin.create({data})


module.exports = readMessageAdmin;
