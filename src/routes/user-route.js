const express = require("express");
const userController = require("../controllers/user-controller");
const { isUser } = require("../middlewares/isUser");
const upload = require("../middlewares/upload");
const {
  validateCoverImage,
  validateUpdateProfileOrProfileImage,
  userReportValidator,
  commentValidator,
  validateEditDiscount,
  singleProfileImageValidator,
  editAboutSellerAndStoreValidator,
  singleCoverImageValidator,
  editEventValidator,
  CoverImageOfCreateEventValidator,
  createEventValidator,
  imagesOfCreateEventValidator,
  createStoreValidator,
} = require("../middlewares/validator");
const { authenticate } = require("../middlewares/authenticate");
const { isSeller } = require("../middlewares/isSeller");

const userRouter = express.Router();

// buyer
// GET
userRouter.get("/me", userController.getMe);
userRouter.get("/event", userController.findEventListOfUser);
userRouter.get("/inbox", userController.fetchAllInbox);
userRouter.get("/favorite", userController.fetchAllFavorite);
userRouter.get("/event/:eventId", userController.afterClickOnTheEventCard);
userRouter.get("/storeProfile/:storeProfileId", userController.storeProfile);
userRouter.get("/coupon-list", userController.fetchAllCoupon);

// POST
userRouter.post("/keep-coupon/:eventId", userController.keepCoupon);
userRouter.post("/report/:storeProfileId", upload.single("reportImage"), userReportValidator, userController.userReport);
userRouter.post("/comment/:storeProfileId", commentValidator, userController.userCreateComment);
userRouter.post("/create-store", createStoreValidator, userController.buyerCreateStore);

// PUT / PATCH
userRouter.patch("/statusMessage/:userId", isUser, userController.statusMessage);
userRouter.patch("/use/:voucherItemId", userController.userUseVoucher);
userRouter.put("/interested/:eventId", userController.interested);
userRouter.put("/follow/:storeProfileId", userController.followAndUnFollowStoreProfile);
userRouter.patch("/read-message/:id", userController.userReadMessage);

// DELETE
userRouter.delete("/remove/:inboxId", userController.removeMessageInbox);

// seller
// create
userRouter.post(
  "/create-event",
  isSeller,
  upload.fields([
    { name: "eventImage", maxCount: 1 },
    { name: "voucherImage", maxCount: 1 },
  ]),
  imagesOfCreateEventValidator,
  createEventValidator,
  userController.createEvent
);
userRouter.post("/create-storeProfile", upload.fields([{ name: "coverImage", maxCount: 1 }]), validateCoverImage, userController.createStore);
userRouter.post("/create-product", upload.fields([{ name: "image", maxCount: 1 }]), validateCoverImage, userController.createProduct);
userRouter.post("/new-message", isSeller, userController.createMessageToBuyers);
userRouter.post("/add-item/:eventId/:productId", isSeller, userController.addItemToEvent);
userRouter.post("/read-message-admin/:adminId", userController.getReadMessageAdmin);

// get
userRouter.get("/my-store-profile", isSeller, userController.getAllProductByStoreProfileId);
userRouter.get("/store-main-page", isSeller, userController.fetchStoreMainPage);
userRouter.get("/store-main-page/:eventId", isSeller, userController.viewDetailYellowCard);
userRouter.get("/my-product", isSeller, userController.sellerMyProduct);
userRouter.get("/my-event", isSeller, userController.eventOfSeller);
userRouter.get("/store-review", isSeller, userController.storeReview);
userRouter.get("/seller-coupon", isSeller, userController.sellerCoupon);
userRouter.get("/seller-history-inbox", isSeller, userController.getHistoryInbox);
userRouter.get("/seller-followers", isSeller, userController.myFollower);
userRouter.get("/seller-followers/:userId", isSeller, userController.myFollowerUserId);

//update
userRouter.patch("/update-coverImage", upload.fields([{ name: "coverImage", maxCount: 1 }]), validateCoverImage, userController.updateCoverImage);
userRouter.patch("/change-info", isUser, upload.fields([{ name: "profileImage", maxCount: 1 }]), validateUpdateProfileOrProfileImage, userController.updateProfileAndProfileImage);
userRouter.patch("/edit-product/:productId", upload.fields([{ name: "image", maxCount: 1 }]), validateCoverImage, userController.editProduct);
userRouter.patch("/edit-discount/:eventId", isSeller, validateEditDiscount, userController.editDiscount);
userRouter.patch("/store-profile-page/edit-user-profile-image", isSeller, upload.single("userProfileImage"), singleProfileImageValidator, userController.editProfileImageInStoreProfilePage);
userRouter.patch("/edit-description-store", isSeller, editAboutSellerAndStoreValidator, userController.editDescriptionStore);
userRouter.patch("/edit-event/:eventId", isSeller, upload.single("eventImage"), editEventValidator, userController.editEvent);

//delete
userRouter.delete("/remove-product/:productId", isSeller, userController.deleteSomeProduct);
userRouter.delete("/remove-event/:eventId", isSeller, userController.sellerRemoveEvent);

module.exports = userRouter;
