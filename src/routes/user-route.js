const express = require("express");
const userController = require("../controllers/user-controller");
const { isUser } = require("../middlewares/isUser");
const upload = require("../middlewares/upload");
const { validateCoverImage } = require("../middlewares/validator");
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


// seller create
userRouter.post('/create-event', userController.createEvent)

userRouter.post('/createStoreProfile',
  upload.fields([{name: 'coverImage', maxCount:1}]),
  validateCoverImage,
  userController.createStore)

// seller update
userRouter.patch('/updateCoverImage',
  upload.fields([{name: 'coverImage', maxCount:1}]),
  validateCoverImage,
  userController.updateCoverImage
);

module.exports = userRouter;
