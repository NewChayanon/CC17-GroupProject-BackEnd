const express = require('express');
const adminController = require('../controllers/admin-controller');

const adminRouter = express.Router();

adminRouter.get('/allUser', adminController.getAllUser)
adminRouter.get('/seller', adminController.getSeller)
adminRouter.get('/buyer', adminController.getBuyer)
adminRouter.patch('/block/:userId', adminController.blocked)
adminRouter.post('/newMessage', adminController.notification)

module.exports = adminRouter;


