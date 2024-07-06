const fs = require("fs/promises");
const { storeProfile } = require("../models/prisma");
const eventServices = require("../services/event-services");
const followService = require("../services/follow-service");
const inboxMessageUserService = require("../services/inboxMessageUser-service");
const interestService = require("../services/interest-service");
const refactorService = require("../services/refactor-services");
const storeProfileService = require("../services/storeProfile-service");
const userService = require("../services/user-service");
const voucherItemService = require("../services/voucherItem-service");
const dataFormat = require("../utils/dataFormat");
const createError = require("../utils/createError");
const uploadService = require("../services/upload-service");
const reportService = require("../services/report-service");
const hashService = require("../services/hash-services");
const commentService = require("../services/comment-service");
const productService = require("../services/product-service");
const eventItemService = require("../services/eventItem-service");

const { log } = require("console");
const { object } = require("joi");
const voucherListService = require("../services/voucherList-service");

const userController = {};

userController.getMe = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    console.log("accessToken", accessToken);
    res.status(200).json({ user: req.user, accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};

userController.findEventListOfUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userInterest = await interestService.findInterestByUserId(user.id);

    const eventInterest = dataFormat.eventInterest(userInterest, user.id);
    res.json(eventInterest);
  } catch (err) {
    next(err);
  }
};

userController.interested = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const event = await eventServices.findEventByEventId(eventId);
    if (!event) {
      return res.status(400).json({ msg: "Event invalid." });
    }
    const interestId = await interestService.findInterestedByUserIdAndEventId(
      userId,
      eventId
    );
    if (!interestId) {
      const interest = await interestService.createInterestByUserIdAndEventId(
        userId,
        eventId
      );
      return res.status(201).json({ msg: "Interested success" });
    }
    const uninterestedEvent = await interestService.deleteInterestById(
      interestId.id
    );
    res.json({ meg: "Uninterested success" });
  } catch (error) {
    next(error);
  }
};

userController.fetchAllInbox = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allInbox = await inboxMessageUserService.findManyInboxMessageByUserId(
      userId
    );
    res.json(allInbox);
  } catch (err) {
    next(err);
  }
};

userController.removeMessageInbox = async (req, res, next) => {
  try {
    const inboxId = +req.params.inboxId;
    const haveMessage = await inboxMessageUserService.findInboxMessageById(
      inboxId
    );
    if (!haveMessage)
      return res.status(404).json({ msg: "Don't have message" });
    const removeMessaged =
      await inboxMessageUserService.removeInboxMessageByInboxId(inboxId);
    res.status(204).json({ msg: "Removed" });
  } catch (err) {
    next(err);
  }
};

// open/close notification
userController.statusMessage = async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    console.log("userId", userId);
    const data = await userService.findUserId(userId);
    console.log("data", data);

    if (data.id !== req.user.id) {
      console.log(data.id);
      console.log(req.user.id);
      return res.status(300).json({ message: "not allowed to convert data" });
    }
    const statusMessage = await userService.updateStatus(
      userId,
      !data.statusMessage
    );
    console.log("statusMessage", statusMessage);
    res.json(statusMessage);
  } catch (error) {
    next(error);
  }
};

userController.getNotificationPublic = async (req, res, next) => {
  const userId = req.user.id;
  if (req.user.role === "ADMIN")
    res.status(300).json({ message: "not allowed to access" });
  const result = await userService.findUserId(userId);

  if (!result) res.status(300).json({ message: "user is not defined" });
  if (result.statusMessage || result.isBlocked)
    res.status(300).json({ message: "No receive Notification" });

  const publicNotification = await userService.getPublicNotification();
  console.log("publicNotification", publicNotification);
  res.status(200).json(publicNotification);
  console.log("result", result);
};

userController.keepCoupon = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const event = await eventServices.findEventByEventId(eventId);
    if (!event) {
      return res.status(400).json({ msg: "Event invalid." });
    }
    const {
      VoucherList: [VoucherList],
      storeProfile,
    } = event;

    if (!VoucherList) return res.json({ msg: "This event have't a coupon." });
    const { VoucherItem } = VoucherList;
    if (VoucherItem.length >= VoucherList.totalAmount)
      return res.status(200).json({ msg: "Coupon sold out." });

    const haveCoupon = VoucherItem.find((el) => el.userId == userId);

    if (haveCoupon) return res.status(200).json({ msg: "You have a coupon." });

    const keepCoupon =
      await voucherItemService.createVoucherItemByVoucherListIdAndStoreProfileIdAndUserId(
        VoucherList.id,
        storeProfile.id,
        userId
      );

    res.status(201).json({ msg: "Successfully collected coupons." });
  } catch (err) {
    next(err);
  }
};

userController.fetchAllFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allFavorite = await followService.findManyFavoriteByUserId(userId);

    const storeProfileId = allFavorite.map((el) => ({
      id: el.storeProfileId,
    }));

    const allStoreProfileIdInFavorite =
      await storeProfileService.findManyStoreProfileByStoreProfileId(
        storeProfileId
      );

    const allFavoriteList = dataFormat.allFavoriteList(
      allFavorite,
      allStoreProfileIdInFavorite
    );

    res.json(allFavoriteList);
  } catch (err) {
    next(err);
  }
};

userController.afterClickOnTheEventCard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const findEventById = await eventServices.findEventByEventIdAndUserId(
      eventId,
      userId
    );
    if (!findEventById) {
      return res.status(400).json({ msg: "Event invalid" });
    }
    const findEventOther = await eventServices.findManyEventByStoreId(
      findEventById.storeProfile.id,
      eventId,
      userId
    );

    const newFindEventById = dataFormat.userEventId(
      findEventById,
      findEventOther,
      userId
    );

    res.json(newFindEventById);
  } catch (err) {
    next(err);
  }
};

// seller

userController.createStore = async (req, res, next) => {
  try {
    const userId = +req.user.id;
    console.log("userId", userId);
    const findUserId = await storeProfileService.findStoreProfileByUserId(
      userId
    );
    console.log("findUserId", findUserId);
    if (findUserId)
      createError(
        res.status(300).json({
          message: "Not allowed to create store you have store already",
        })
      );

    const promises = [];
    if (req.files.coverImage) {
      const result = uploadService
        .upload(req.files.coverImage[0].path)
        .then((url) => ({ url, key: "coverImage" }));
      promises.push(result);
    }

    const result = await Promise.all(promises);
    console.log("result", result);
    const data = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});

    const input = {
      userId: userId,
      name: req.body.name,
      coverImage: data.coverImage,
      sellerDescription: req.body.sellerDescription,
      description: req.body.description,
    };
    const createStoreProfile = await storeProfileService.createStoreProfile(
      input
    );
    const convertToSeller = await userService.updateStatus(
      userId,
      (role = "SELLER")
    );

    console.log("createStoreProfile", createStoreProfile);

    res.status(200).json(createStoreProfile);
  } catch (error) {
    next(error);
  } finally {
    console.log(req.files.coverImage[0].path);
    if (req.files.coverImage) {
      fs.unlink(req.files.coverImage[0].path);
    }
  }
};

userController.updateCoverImage = async (req, res, next) => {
  try {
    const promises = [];
    console.log(req.files);
    if (req.files.coverImage) {
      const result = uploadService
        .upload(req.files.coverImage[0].path)
        .then((url) => ({ url, key: "coverImage" }));
      promises.push(result);
    }

    const result = await Promise.all(promises);
    console.log(result);
    const data = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});
    console.log("data1", data);
    await userService.updateCoverImageById(+req.user.id, data);
    console.log("first3");
    res.status(200).json(data);
  } catch (err) {
    next(err);
  } finally {
    console.log(req.files.coverImage[0].path);
    if (req.files.coverImage) {
      fs.unlink(req.files.coverImage[0].path);
    }
  }
};

userController.updateProfileAndProfileImage = async (req, res, next) => {
  try {
    const promises = [];
    console.log(req.files);
    if (req.files.profileImage) {
      const result = uploadService
        .upload(req.files.profileImage[0].path)
        .then((url) => ({ url, key: "profileImage" }));
      promises.push(result);
    }

    const result = await Promise.all(promises);
    console.log(result);
    const data = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});
    console.log("data1", data);

    const updateInfo = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      profileImage: data?.profileImage,
      mobile: req.body?.mobile,
      password: req.body?.password,
      confirmPassword: req.body?.confirmPassword,
    };

    if (updateInfo.password !== updateInfo.confirmPassword) {
      return createError({
        message: "password or confirmPassword invalid",
        statusCode: 400,
      });
    }
    updateInfo.password = await hashService.hash(updateInfo.password);
    console.log("updateInfo", updateInfo);

    delete updateInfo.password;
    delete updateInfo.confirmPassword;
    await userService.updatePersonalInformationById(+req.user.id, updateInfo);
    console.log("updateInfo", updateInfo);
    res
      .status(200)
      .json({ message: "update personal information complete!!!." });
  } catch (error) {
    next(error);
  } finally {
    // console.log(req.files?.profileImage[0].path);
    if (req.files.coverImage) {
      fs.unlink(req.files?.profileImage[0].path);
    }
  }
};

userController.editProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const productUserId = req.user.id;
    console.log("userIdProduct", productUserId);
    const findUserIdInStoreProfile =
      await storeProfileService.findStoreProfileByUserId(productUserId);
    console.log("findUserIdInStoreProfileId", findUserIdInStoreProfile.id);

    const promises = [];
    if (req.files.image) {
      const result = uploadService
        .upload(req.files.image[0].path)
        .then((url) => ({ url, key: "image" }));
      promises.push(result);
    }
    const result = await Promise.all(promises);
    console.log("result", result);
    const input = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});

    const data = {
      // storeProfileId : findUserIdInStoreProfile.id,
      name: req.body.name,
      description: req.body.description,
      image: input.image,
    };

    const editProduct = await productService.updateProduct(productId, data);
    res.status(201).json(editProduct);
  } catch (error) {
    next(error);
  } finally {
    console.log(req.files.image[0].path);
    if (req.files.image) {
      fs.unlink(req.files.image[0].path);
    }
  }
};

userController.getAllProductByStoreProfileId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("allProductUserId", userId);
    const storeProfileId = await storeProfileService.findStoreProfileByUserId(
      userId
    );
    console.log("storeProfileId", storeProfileId.id);

    const findAllProduct = await productService.getAllProductByStoreProfileId(
      storeProfileId.id
    );
    console.log("findAllProduct", findAllProduct);
    res.status(200).json(findAllProduct);
  } catch (error) {
    next(error);
  }
};

userController.createEvent = async (req, res, next) => {
  try {
    const userInfo = req.user.id;
    console.log("userInfo", userInfo);
    const findUserIdInStoreProfile =
      await storeProfileService.findStoreProfileByUserId(userInfo);
    console.log("findUserIdInStoreProfile", findUserIdInStoreProfile);
    console.log("findUserIdInStoreProfileId", findUserIdInStoreProfile.id);

    const promises = [];
    if (req.files.images) {
      const result = uploadService
        .upload(req.files.images[0].path)
        .then((url) => ({ url, key: "images" }));
      promises.push(result);
    }
    const result = await Promise.all(promises);
    console.log("result", result);
    const input = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});

    const data = {
      storeProfileId: findUserIdInStoreProfile.id,
      name: req.body.name,
      images: input.images,
      location: req.body.location,
      locationName: req.body.locationName,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const createEvent = await eventServices.createEventsByStoreProfileId(data);
    console.log("createEvent", createEvent);
    res.status(200).json(createEvent);
  } catch (error) {
    next(error);
  } finally {
    console.log(req.files.images[0].path);
    if (req.files.images) {
      fs.unlink(req.files.images[0].path);
    }
  }
};

userController.addMoreProduct = async (req, res, next) => {
  try {
    const productUserId = req.user.id;
    console.log("userIdProduct", productUserId);
    const findUserIdInStoreProfile =
      await storeProfileService.findStoreProfileByUserId(productUserId);
    console.log("findUserIdInStoreProfileId", findUserIdInStoreProfile.id);

    const promises = [];
    if (req.files.image) {
      const result = uploadService
        .upload(req.files.image[0].path)
        .then((url) => ({ url, key: "image" }));
      promises.push(result);
    }
    const result = await Promise.all(promises);
    console.log("result", result);
    const input = result.reduce((acc, item) => {
      acc[item.key] = item.url;
      return acc;
    }, {});

    const data = {
      // storeProfileId : findUserIdInStoreProfile.id,
      name: req.body.name,
      description: req.body.description,
      image: input.image,
    };

    const createProduct = await productService.createProduct(data);
    console.log("createProduct", createProduct);
    res.status(200).json(createProduct);
  } catch (error) {
    next(error);
  } finally {
    console.log(req.files.image[0].path);
    if (req.files.image) {
      fs.unlink(req.files.image[0].path);
    }
  }
};

userController.deleteSomeProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    console.log("productId", productId);
    const findProduct = await productService.getProductById(productId);
    console.log("findProduct", findProduct);
    if (!findProduct) {
      return createError({ message: "product not found" });
    }
    const deleteProduct = await productService.deleteProductById(
      findProduct.id
    );
    console.log("deleteProduct", deleteProduct);
    res.status(200).json({ message: "delete product complete" });
  } catch (error) {
    next(error);
  }
};

userController.storeProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storeProfileId = +req.params.storeProfileId;
    const infoStoreProfile =
      await storeProfileService.findStoreProfileByStoreProfileId(
        storeProfileId
      );
    if (!infoStoreProfile) {
      return res.status(400).json({ msg: "Store profile invalid." });
    }
    const result = dataFormat.userStoreProfileId(infoStoreProfile, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

userController.followAndUnFollowStoreProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storeProfileId = +req.params.storeProfileId;

    const storeProfile =
      await storeProfileService.findStoreProfileByStoreProfileId(
        storeProfileId
      );
    if (!storeProfile) {
      return res.status(400).json({ msg: "Store profile invalid." });
    }

    const isFollow = await followService.findFollowByUserIdAndStoreProfileId(
      userId,
      storeProfileId
    );

    if (!isFollow) {
      const followed =
        await followService.createFollowByUserIdAndStoreProfileId(
          userId,
          storeProfileId
        );
      return res.status(201).json({ msg: "Followed" });
    }

    const unFollowed = await followService.deleteFollowById(isFollow.id);
    res.json({ meg: "UnFollowed" });
  } catch (err) {
    next(err);
  }
};

userController.userReport = async (req, res, next) => {
  try {
    const storeProfileReported = +req.params.storeProfileId;
    const userIdReporter = req.user.id;
    const reportImage = req.file.path;
    const { subject, message } = req.report;

    if (!storeProfileReported) {
      return res.status(400).json({ msg: "StoreProfile is required." });
    }

    const haveStoreProfile =
      await storeProfileService.findStoreProfileByStoreProfileId(
        storeProfileReported
      );
    if (!haveStoreProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid." });
    }

    if (!(reportImage && subject && message)) {
      return res.status(400).json({ msg: "Report or image is required." });
    }

    const image = await uploadService.upload(reportImage);

    const data = {
      storeProfileReported,
      userIdReporter,
      subject,
      message,
      image,
    };

    const reported = await reportService.createReportByData(data);

    res.status(201).json({ msg: "Create report successfully." });
  } catch (err) {
    next(err);
  } finally {
    if (req.file.path) {
      fs.unlink(req.file.path);
    }
  }
};

userController.userCreateComment = async (req, res, next) => {
  try {
    const storeProfileId = +req.params.storeProfileId;
    const userId = req.user.id;
    const { topic, comment, rate } = req.body;

    if (!(storeProfileId && topic && comment && rate)) {
      return res.status(400).json({ msg: "Comment invalid" });
    }

    const haveStoreProfile =
      await storeProfileService.findStoreProfileByStoreProfileId(
        storeProfileId
      );
    if (!haveStoreProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }

    const data = { storeProfileId, userId, topic, comment, rate };

    req.body.isVerify ? (data.isVerify = req.body.isVerify) : null;

    const commented = await commentService.createCommentByData(data);
    res.status(201).json({ msg: "Create comment successfully" });
  } catch (err) {
    next(err);
  }
};

userController.fetchAllCoupon = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allCoupon = await voucherItemService.findManyVoucherItemByUserId(
      userId
    );
    const newAllCoupon = dataFormat.couponList(allCoupon);
    res.json(newAllCoupon);
  } catch (err) {
    next(err);
  }
};

userController.userUseVoucher = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const voucherItemId = +req.params.voucherItemId;

    const haveVoucher =
      await voucherItemService.findVoucherItemByUserIdAndVoucherItemId({
        userId,
        id: voucherItemId,
      });
    if (!haveVoucher) {
      return res.status(400).json({ msg: "You don't have permission" });
    }

    const voucher = await voucherItemService.updateVoucherItemByIdAndUserId(
      { id: voucherItemId, userId },
      { status: "USED" }
    );

    res.json({ msg: "use coupon success" });
  } catch (err) {
    next(err);
  }
};

userController.fetchStoreMainPage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const myEvent = await storeProfileService.findStoreProfileByUserId(userId);
    const countFollower = await followService.groupByFollowByStoreProfileId(
      myEvent.id
    );
    const countVoucher = await voucherItemService.groupByVoucherItemByStoreId([
      myEvent.id,
    ]);
    const data = dataFormat.StoreMainPage(myEvent, countFollower, countVoucher);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

userController.createMessageToBuyers = async (req, res, next) => {
  try {
    const userId = +req.user.id;
    const store = await storeProfileService.findStoreProfileByUserId(userId);
    const follow = await followService.findManyUserIdFollowerByStoreProfileId(
      store.id
    );
    const event = await eventServices.findEventsByStoreProfileId(store.id);

    let eventId = [];
    event.map((el) => eventId.push(el.id));

    const userInterest = await interestService.findUserInterestByEventId(
      eventId
    );
    // console.log('userInterest',userInterest)

    const followerAndInterest = [...follow, ...userInterest];
    // console.log('followerAndInterest',followerAndInterest)

    const receive = followerAndInterest.reduce((acc, el) => {
      const check = acc.find((rs) => rs === el.userId);
      if (!check) {
        acc.push(el.userId);
      }
      return acc;
    }, []);

    const input = req.body;
    const data = receive.map((id) => ({
      ...input,
      userIdSender: userId,
      userIdReceiver: id,
    }));
    console.log("data", data);

    const result = await userService.createNotification(data);
    console.log("result", result);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
userController.viewDetailYellowCard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const storeProfile = await storeProfileService.findStoreProfileByUserId(
      userId
    );
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const haveEvent = await eventServices.findUniqueEventByIdAndStoreProfileId(
      eventId,
      storeProfile.id
    );
    if (!haveEvent) {
      return res.status(400).json({ msg: "EventId invalid" });
    }
    const event = await eventServices.findEventByEventId(eventId);
    const dataFormatEvent = await dataFormat.detailYellowCard(event);
    res.json(dataFormatEvent);
  } catch (err) {
    next(err);
  }
};

userController.sellerMyProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storeProfile = await storeProfileService.findStoreProfileByUserId(
      userId
    );
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const myProduct = await productService.getAllProductByStoreProfileId(
      storeProfile.id
    );
    const dataFormatMyProduct = dataFormat.myProduct(myProduct);
    res.json(dataFormatMyProduct);
  } catch (err) {
    next(err);
  }
};

userController.addItemToEvent = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const productId = +req.params.productId;
    const data = { eventId, productId };
    const storeProfile = await storeProfileService.findStoreProfileByUserId(
      userId
    );
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const haveEventInStore =
      await eventServices.findFirstEventByEventIdAndStoreProfileId(
        eventId,
        storeProfile.id
      );
    if (!haveEventInStore) {
      return res.status(400).json({ msg: "EventId invalid." });
    }

    const haveProductInEvent =
      await eventItemService.findFirstByEventIdAndProductId(data);
    if (haveProductInEvent) {
      return res.status(400).json({ msg: "Have product in event." });
    }

    const haveProductInStore =
      await productService.findFirstProductByProductIdAndStoreProfileId(
        productId,
        storeProfile.id
      );
    if (!haveProductInStore) {
      return res
        .status(400)
        .json({ msg: "This product is not from this store." });
    }

    const item = await eventItemService.createEventItemByEventIdAndProductId(
      data
    );
    const dataFormatAddProduct = dataFormat.addProduct(item);
    res.status(201).json(dataFormatAddProduct);
  } catch (err) {
    next(err);
  }
};

userController.editDiscount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const event = await eventServices.findEventByEventId(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found!!!" });
    }
    const { storeProfile, VoucherList } = event;
    if (storeProfile.userId !== userId) {
      return res
        .status(403)
        .json({ msg: "Editing of this event is not allowed." });
    }
    if (VoucherList.length === 0) {
      return res.status(404).json({ msg: "Event have not coupon." });
    }
    const [{ id }] = VoucherList;
    const discounted = await voucherListService.updateDiscountByEventId(
      id,
      req.body
    );
    res.status(201).json(discounted);
  } catch (err) {
    next(err);
  }
};

userController.sellerRemoveEvent = async (req, res, next) => {
  try {
    const eventOfSeller = req.seller.eventId;
    const eventId = +req.params.eventId;
    const event = eventOfSeller.find((el) => el === eventId);
    if (!event) {
      return res
        .status(403)
        .json({ msg: "Not Authorized to Delete This Event" });
    }

    const deleteInterest = await interestService.deleteManyInterestByEventId(
      eventId
    );
    const deleteEventItem = await eventItemService.deleteManyEventItemByEventId(
      eventId
    );
    const haveVoucherList =
      await voucherListService.findFirstVoucherListByEventId(eventId);
    if (haveVoucherList) {
      const deleteVoucherItem =
        await voucherItemService.deleteManyVoucherItemByVoucherListId(
          haveVoucherList.id
        );
      const deleteVoucherList =
        await voucherListService.deleteManyVoucherListByEventId(eventId);
    }
    const deleteEvent = await eventServices.deleteEventById(eventId);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

userController.eventOfSeller = async (req, res, next) => {
  try {
    const storeProfileId = req.seller.storeProfileId;
    const allMyEvent = await eventServices.findEventsByStoreProfileId(
      storeProfileId
    );
    const dataFormatMyevent = dataFormat.myEvent(allMyEvent);
    res.json(dataFormatMyevent);
  } catch (err) {
    next(err);
  }
};

userController.editProfileImageInStoreProfilePage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userProfileImage = req.file.path;
    const image = await uploadService.upload(userProfileImage);
    const data = { profileImage: image };
    const updateProfileImaged = await userService.updateUserByIdAndData(
      userId,
      data
    );
    const { id, profileImage } = updateProfileImaged;
    const response = { userId: id, userProfileImage: profileImage };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  } finally {
    if (req.file.path) {
      fs.unlink(req.file.path);
    }
  }
};

module.exports = userController;
