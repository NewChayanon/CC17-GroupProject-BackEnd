const express = require('express');
const adminController = require('../controllers/admin-controller');
const { authenticate } = require('../middlewares/authenticate');

const adminRouter = express.Router();

adminRouter.get('/allUser', adminController.getAllUser)
adminRouter.get('/seller', adminController.getSeller)
adminRouter.get('/buyer', adminController.getBuyer)
adminRouter.patch('/block/:userId', adminController.blocked)
adminRouter.post('/newMessage', adminController.createNotification)
adminRouter.get('/allMessages', adminController.getAllMessages)
// adminRouter.patch('/editMessages/:id',adminController.editMessages)
adminRouter.delete('/deleteMessage/:id', adminController.deleteMessages)

module.exports = adminRouter;



