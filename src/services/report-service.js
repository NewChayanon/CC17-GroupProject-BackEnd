const prisma = require("../models/prisma");

const reportService = {};

reportService.createReportByData = (data) => prisma.report.create({ data });

module.exports = reportService;
