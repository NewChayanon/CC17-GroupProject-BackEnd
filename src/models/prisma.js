const { PrismaClient } = require("@prisma/client");
const { query } = require("express");

const prisma = new PrismaClient ({log:['query']});

module.exports = prisma;