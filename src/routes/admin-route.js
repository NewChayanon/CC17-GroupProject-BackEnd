const express = require('express');
const adminController = require('../controllers/admin-controller');

const adminRouter = express.Router();


adminRouter.patch('/block/:userId', adminController.blocked)
adminRouter.patch('/statusMessage/:userId', adminController.statusMessage)
adminRouter.post('/newMessage', adminController.createNotification)

module.exports = adminRouter;



