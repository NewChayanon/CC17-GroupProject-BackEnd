const express = require("express");
const userController = require("../controllers/user-controller");
const { isUser } = require("../middlewares/isUser");
const userRouter = express.Router();

// buyer
userRouter.get("/me", userController.getMe);
userRouter.get("/event", userController.findEventListOfUser);
userRouter.put("/interested/:eventId", userController.interested);
userRouter.get("/inbox", userController.fetchAllInbox);
userRouter.delete("/remove/:inboxId", userController.removeMessageInbox);
userRouter.post("/keep-coupon/:eventId", userController.keepCoupon);
userRouter.patch('/statusMessage/:userId', isUser,userController.statusMessage)
userRouter.get("/notification", userController.getNotificationPublic);
userRouter.get('/favorite',userController.fetchAllFavorite)
userRouter.get("/event/:eventId", userController.afterClickOnTheEventCard);
userRouter.get("/:storeProfileId",userController.storeProfile)
userRouter.put("/follow/:storeProfileId",userController.followAndUnFollowStoreProfile)

// seller
userRouter.post('/create-event', userController.createEvent)
userRouter.post('/createStoreProfile', userController.createStore)

module.exports = userRouter;
