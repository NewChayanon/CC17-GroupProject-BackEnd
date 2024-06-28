const express = require("express");
const userController = require("../controllers/user-controller");
const userRouter = express.Router();

userRouter.get("/me", userController.getMe);
userRouter.get("/event", userController.findEventListOfUser);
userRouter.get("/event/:eventId", userController.afterClickOnTheEventCard);
userRouter.put("/interested/:eventId",userController.interested);
userRouter.get('/inbox',userController.fetchAllInbox)
userRouter.delete('/remove/:inboxId',userController.removeMessageInbox)

userRouter.get('/allUser', userController.getAllUser)
userRouter.get('/seller', userController.getSeller)
userRouter.get('/buyer', userController.getBuyer)
userRouter.get('/notification', userController.getNotification)

module.exports = userRouter;
