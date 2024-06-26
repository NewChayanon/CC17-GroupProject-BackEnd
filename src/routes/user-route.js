const express = require("express");
const userController = require("../controllers/user-controller");
const userRouter = express.Router();

userRouter.get("/me", userController.getMe);
userRouter.get("/event", userController.findEventListOfUser);
userRouter.get("/event/:eventId", userController.afterClickOnTheEventCard);
userRouter.delete("/uninterested/:eventId",userController.uninterested);
userRouter.get('/inbox',userController.fetchAllInbox)

module.exports = userRouter;
