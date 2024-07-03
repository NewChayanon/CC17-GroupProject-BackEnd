const express = require("express");
const userController = require("../controllers/user-controller");
const { isUser } = require("../middlewares/isUser");
const upload = require("../middlewares/upload");
const { validateCoverImage, validateUpdateProfileOrProfileImage, userReportValidator, commentValidator } = require("../middlewares/validator");
const { authenticate } = require("../middlewares/authenticate");
const { isSeller } = require("../middlewares/isSeller");

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
userRouter.get("/storeProfile/:storeProfileId",userController.storeProfile);
userRouter.put("/follow/:storeProfileId",userController.followAndUnFollowStoreProfile)
userRouter.post("/report/:storeProfileId",upload.single("reportImage"),userReportValidator,userController.userReport)
userRouter.post("/comment/:storeProfileId",commentValidator,userController.userCreateComment)
userRouter.get("/coupon-list",userController.fetchAllCoupon)
userRouter.patch("/use/:voucherItemId",userController.userUseVoucher)




// seller 
  //create
userRouter.post('/create-event', 
  upload.fields([{name: 'images', maxCount:1}]),
  validateCoverImage,
  userController.createEvent)



userRouter.post('/createStoreProfile',
  upload.fields([{name: 'coverImage', maxCount:1}]),
  validateCoverImage,
  userController.createStore)

  //update
userRouter.patch('/updateCoverImage',
  upload.fields([{name: 'coverImage', maxCount:1}]),
  validateCoverImage,
  userController.updateCoverImage
);

userRouter.patch('/changeInfo',authenticate,isUser,
upload.fields([{name: 'profileImage', maxCount:1}]),
validateUpdateProfileOrProfileImage,
userController.updateProfileAndProfileImage)

userRouter.get("/store-main-page",isSeller,userController.fetchStoreMainPage)

module.exports = userRouter;
