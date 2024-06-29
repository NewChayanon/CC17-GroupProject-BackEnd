const express = require("express");
const userController = require("../controllers/user-controller");
const userRouter = express.Router();

userRouter.get("/me", userController.getMe);
userRouter.get("/event", userController.findEventListOfUser);
userRouter.put("/interested/:eventId", userController.interested);
userRouter.get("/inbox", userController.fetchAllInbox);
userRouter.delete("/remove/:inboxId", userController.removeMessageInbox);
userRouter.post("/keep-coupon/:eventId", userController.keepCoupon);

userRouter.get("/notification", userController.getNotificationPublic);

module.exports = userRouter;
