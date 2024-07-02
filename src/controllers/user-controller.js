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
    console.log(userInterest);
    // res-frontEnd => [{id,eventName,eventImage,eventStartDate,eventEndDate,sellerId,sellerFirstName,sellerCoverImage}]
    const eventInterest = refactorService.eventInterest(userInterest);
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
    console.log("createStoreProfile", createStoreProfile);
    res.status(200).json({ message: "create store complete!!!." });
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
    console.log(req.files.profileImage[0].path);
    if (req.files.coverImage) {
      fs.unlink(req.files.profileImage[0].path);
    }
  }
};

userController.createEvent = async (req, res, next) => {
  try {
    const createEvent = await eventServices.createEvents();
    console.log("createEvent", createEvent);
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

module.exports = userController;
