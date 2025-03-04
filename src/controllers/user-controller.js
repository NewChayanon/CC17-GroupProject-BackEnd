const fs = require("fs/promises");
const { storeProfile, eventItem } = require("../models/prisma");
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
const readMessageAdmin = require("../services/readMessageAdmin-service");

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
    const interestId = await interestService.findInterestedByUserIdAndEventId(userId, eventId);
    if (!interestId) {
      const interest = await interestService.createInterestByUserIdAndEventId(userId, eventId);
      return res.status(201).json({ msg: "Interested success" });
    }
    const uninterestedEvent = await interestService.deleteInterestById(interestId.id);
    res.json({ meg: "Uninterested success" });
  } catch (error) {
    next(error);
  }
};

userController.fetchAllInbox = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.user.role === "ADMIN") res.status(300).json({ message: "not allowed to access" });
    const result = await userService.findUserId(userId);

    if (!result) res.status(300).json({ message: "user is not defined" });
    if (result.statusMessage || result.isBlocked) res.status(300).json({ message: "No receive Notification" });

    const publicNotification = await userService.getPublicNotification();
    console.log("publicNotification", publicNotification);
    const sellerNotification = await inboxMessageUserService.findInboxMessageByUserIdReceiver(userId);
    const sellerAndPublicNotification = [...publicNotification, ...sellerNotification];
    console.log("sellerAndPublicNotification", sellerAndPublicNotification);
    res.status(200).json(sellerAndPublicNotification);
  } catch (err) {
    next(err);
  }
};

userController.removeMessageInbox = async (req, res, next) => {
  try {
    const inboxId = +req.params.inboxId;
    const haveMessage = await inboxMessageUserService.findInboxMessageById(inboxId);
    if (!haveMessage) return res.status(404).json({ msg: "Don't have message" });
    const removeMessaged = await inboxMessageUserService.removeInboxMessageByInboxId(inboxId);
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
    const role = req.user.role;
    console.log(role);
    const data = await userService.findUserId(userId);
    console.log("data", data);

    if (data.id !== req.user.id) {
      console.log(data.id);
      console.log(req.user.id);
      return res.status(300).json({ message: "not allowed to convert data" });
    }
    const statusMessage = await userService.updateStatus(userId, role, !data.statusMessage);
    console.log("statusMessage", statusMessage);
    res.json(statusMessage);
  } catch (error) {
    next(error);
  }
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
    if (VoucherItem.length >= VoucherList.totalAmount) return res.status(200).json({ msg: "Coupon sold out." });

    const haveCoupon = VoucherItem.find((el) => el.userId == userId);

    if (haveCoupon) return res.status(200).json({ msg: "You have a coupon." });

    const keepCoupon = await voucherItemService.createVoucherItemByVoucherListIdAndStoreProfileIdAndUserId(VoucherList.id, storeProfile.id, userId);

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

    const allStoreProfileIdInFavorite = await storeProfileService.findManyStoreProfileByStoreProfileId(storeProfileId);

    const allFavoriteList = dataFormat.allFavoriteList(allFavorite, allStoreProfileIdInFavorite);

    res.json(allFavoriteList);
  } catch (err) {
    next(err);
  }
};

userController.afterClickOnTheEventCard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const findEventById = await eventServices.findEventByEventIdAndUserId(eventId, userId);
    if (!findEventById) {
      return res.status(400).json({ msg: "Event invalid" });
    }
    const findEventOther = await eventServices.findManyEventByStoreId(findEventById.storeProfile.id, eventId, userId);

    const newFindEventById = dataFormat.userEventId(findEventById, findEventOther, userId);

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
    const findUserId = await storeProfileService.findStoreProfileByUserId(userId);
    console.log("findUserId", findUserId);
    if (findUserId)
      createError(
        res.status(300).json({
          message: "Not allowed to create store you have store already",
        })
      );

    const promises = [];
    if (req.files.coverImage) {
      const result = uploadService.upload(req.files.coverImage[0].path).then((url) => ({ url, key: "coverImage" }));
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
    const createStoreProfile = await storeProfileService.createStoreProfile(input);
    const convertToSeller = await userService.updateStatus(userId, (role = "SELLER"));

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
      const result = uploadService.upload(req.files.coverImage[0].path).then((url) => ({ url, key: "coverImage" }));
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
    const userId = +req.user.id;
    const promises = [];
    console.log(req.files);
    if (req.files.profileImage) {
      const result = uploadService.upload(req.files.profileImage[0].path).then((url) => ({ url, key: "profileImage" }));
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
      displayName: req.body?.displayName,
      gender: req.body?.gender,
      dateOfBirth: req.body?.dateOfBirth,
      confirmPassword: req.body?.confirmPassword,
    };

    console.log("updateInfo", updateInfo);

    if (updateInfo.password !== updateInfo.confirmPassword) {
      return createError({
        message: "password or confirmPassword invalid",
        statusCode: 400,
      });
    }
    if (updateInfo.password) {
      updateInfo.password = await hashService.hash(updateInfo.password);
      delete updateInfo.confirmPassword;
    }
    console.log("updateInfo1", updateInfo);

    const rs = await userService.updatePersonalInformationById(userId, updateInfo);
    console.log("rs", rs);
    res.status(200).json(rs);
    // delete updateInfo.password;
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
    const findUserIdInStoreProfile = await storeProfileService.findStoreProfileByUserId(productUserId);
    console.log("findUserIdInStoreProfileId", findUserIdInStoreProfile.id);

    const promises = [];
    if (req.files.image) {
      const result = uploadService.upload(req.files.image[0].path).then((url) => ({ url, key: "image" }));
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
    const storeProfileId = req.seller.storeProfileId;
    const mySeller = userService.findUserId(userId);
    const myStoreProfile = storeProfileService.findFirstStoreProfileById(storeProfileId);
    const myFollower = followService.findManyFollowByStoreProfileId(storeProfileId);
    const myEvent = eventServices.findManyEventByStoreProfileId(storeProfileId);
    const myVoucherItem = voucherItemService.findManyVoucherItemByStoreProfile(storeProfileId);
    const myProduct = productService.findManyProductByStoreProfileId(storeProfileId);
    const promise = [];
    promise.push(mySeller, myStoreProfile, myFollower, myEvent, myVoucherItem, myProduct);
    const data = await Promise.all(promise);

    const response = dataFormat.myStoreProfile(data);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

userController.createEvent = async (req, res, next) => {
  try {
    const { storeProfileId, productId } = req.seller;
    const body = req.seller.createEvent;
    const { eventImage, voucherImage } = req.files;

    let haveProduct = true;
    for (let item of body.eventItem) {
      const check = productId.find((el) => el === item.productId);
      if (!check) {
        haveProduct = false;
        break;
      }
    }

    if (!haveProduct) {
      return res.status(400).json({ msg: "ProductId invalid." });
    }

    if (!body || !eventImage) {
      return res.status(400).json({ msg: "Create event invalid." });
    }

    const dataEvent = {
      storeProfileId,
      name: body.name,
      description: body.description,
      location: body.location,
      locationName: body.locationName,
      startDate: body.startDate,
      endDate: body.endDate,
      openTime: body.openTime,
      closingTime: body.closingTime,
    };

    const thaiTimeOffset = 7 * 60 * 60 * 1000;
    const today = new Date(Date.now() + thaiTimeOffset);
    const dateToday = today.toISOString().split("T")[0];
    const eventStartDate = body.startDate.toISOString().split("T")[0];

    if (eventStartDate === dateToday) {
      dataEvent.isActive = true;
    }

    const promise = [];
    if (eventImage) {
      const result = uploadService.upload(eventImage[0].path).then((url) => ({ eventImage: url }));
      promise.push(result);
    }

    const dataVoucherList = {};
    if (voucherImage) {
      const result = uploadService.upload(voucherImage[0].path).then((url) => ({ voucherImage: url }));
      promise.push(result);

      Object.assign(dataVoucherList, {
        code: body.voucher.code,
        description: body.voucher.description,
        condition: body.voucher.condition,
        totalAmount: body.voucher.totalAmount,
        discount: body.voucher.discount,
      });
    }

    const images = await Promise.all(promise);

    images.forEach((el) => {
      if (el.eventImage) {
        dataEvent.images = el.eventImage;
      }
      if (el.voucherImage) {
        dataVoucherList.image = el.voucherImage;
      }
    });

    const event = await eventServices.createEventsByStoreProfileId(dataEvent);

    const dataEventItem = body.eventItem.map(({ productId }) => ({
      eventId: event.id,
      productId,
    }));
    await eventItemService.createManyEventItemByData(dataEventItem);

    if (voucherImage) {
      dataVoucherList.eventId = event.id;
      await voucherListService.createVoucherListByData(dataVoucherList);
    }

    res.status(201).json({ msg: "create event success." });
  } catch (error) {
    next(error);
  } finally {
    const { eventImage, voucherImage } = req.files;
    if (eventImage) {
      fs.unlink(eventImage[0].path, (err) => {
        if (err) next(err);
      });
    }
    if (voucherImage) {
      fs.unlink(voucherImage[0].path, (err) => {
        if (err) next(err);
      });
    }
  }
};

userController.createProduct = async (req, res, next) => {
  try {
    const productUserId = req.user.id;
    console.log("userIdProduct", productUserId);
    const findUserIdInStoreProfile = await storeProfileService.findStoreProfileByUserId(productUserId);
    console.log("findUserIdInStoreProfileId", findUserIdInStoreProfile.id);

    const promises = [];
    if (req.files.image) {
      const result = uploadService.upload(req.files.image[0].path).then((url) => ({ url, key: "image" }));
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
      name: req.body?.productName,
      description: req.body?.productDescription,
      image: input?.image,
      price: +req.body?.productPrice,
      unit: req.body?.productUnit,
    };
    console.log("first");

    const createProduct = await productService.createProduct(data);
    console.log("createProduct", createProduct);
    res.status(200).json(createProduct);
  } catch (error) {
    next(error);
  } finally {
    // console.log(req.files.image[0].path);
    if (req.files.image) {
      fs.unlink(req.files.image[0].path);
    }
  }
};

userController.deleteSomeProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const myProduct = req.seller.productId;
    const findProduct = myProduct.find((el) => el === productId);

    if (!findProduct) {
      return createError({ message: "product not found", statusCode: 404 });
    }
    await eventItemService.deleteManyEventItemByProductId(productId);
    await productService.deleteProductById(productId);

    res.status(200).json({ message: "delete product complete" });
  } catch (error) {
    next(error);
  }
};

userController.storeProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storeProfileId = +req.params.storeProfileId;
    const infoStoreProfile = await storeProfileService.findStoreProfileByStoreProfileId(storeProfileId);
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

    const storeProfile = await storeProfileService.findStoreProfileByStoreProfileId(storeProfileId);
    if (!storeProfile) {
      return res.status(400).json({ msg: "Store profile invalid." });
    }

    const isFollow = await followService.findFollowByUserIdAndStoreProfileId(userId, storeProfileId);

    if (!isFollow) {
      const followed = await followService.createFollowByUserIdAndStoreProfileId(userId, storeProfileId);
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

    const haveStoreProfile = await storeProfileService.findStoreProfileByStoreProfileId(storeProfileReported);
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

    const haveStoreProfile = await storeProfileService.findStoreProfileByStoreProfileId(storeProfileId);
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
    const allCoupon = await voucherItemService.findManyVoucherItemByUserId(userId);
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

    const haveVoucher = await voucherItemService.findVoucherItemByUserIdAndVoucherItemId({
      userId,
      id: voucherItemId,
    });
    if (!haveVoucher) {
      return res.status(400).json({ msg: "You don't have permission" });
    }

    const voucher = await voucherItemService.updateVoucherItemByIdAndUserId({ id: voucherItemId, userId }, { status: "USED" });

    res.json({ msg: "use coupon success" });
  } catch (err) {
    next(err);
  }
};

userController.fetchStoreMainPage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const myEvent = await storeProfileService.findStoreProfileByUserId(userId);
    const countFollower = await followService.groupByFollowByStoreProfileId(myEvent.id);
    const countVoucher = await voucherItemService.groupByVoucherItemByStoreId([myEvent.id]);
    const data = dataFormat.StoreMainPage(myEvent, countFollower, countVoucher);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

userController.createMessageToBuyers = async (req, res, next) => {
  try {
    const userId = +req.user.id;
    console.log("userId", userId);
    // follower
    const store = await storeProfileService.findStoreProfileByUserId(userId);
    const userFollow = await followService.findManyUserIdFollowerByStoreProfileId(store.id);

    // interested
    const event = await eventServices.findEventsByStoreProfileId(store.id);

    let eventId = [];
    event.map((el) => eventId.push(el.id));

    const userInterest = await interestService.findUserInterestByEventId(eventId);
    // console.log('userInterest',userInterest)

    // get coupon
    const userCoupon = await voucherItemService.findUserIdAtVoucherItemByStoreProfileId(store.id);
    // console.log('coupon',userCoupon)

    const followerAndInterestAndCoupon = [...userFollow, ...userInterest, ...userCoupon];
    console.log("followerAndInterestAndCoupon", followerAndInterestAndCoupon);

    const receive = followerAndInterestAndCoupon.reduce((acc, el) => {
      const check = acc.find((rs) => rs === el.userId);
      if (!check) {
        acc.push(el.userId);
      }
      return acc;
    }, []);

    const receiver = receive.filter((item) => item !== userId);
    console.log("receiver", receiver);

    const input = req.body;
    console.log("input", input);
    const data = receiver.map((id) => ({
      ...input,
      userIdSender: userId,
      userIdReceiver: id,
    }));
    console.log("data", data);

    const result = await userService.createNotification(data);
    console.log("result", data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

userController.getReadMessageAdmin = async (req, res, next) => {
  try {
    const userId = +req.user.id;
    console.log("userId", userId);
    input = req.params?.adminId;
    console.log("input", input);

    const selectPublicNotification = await userService.selectPublicNotification(+input);
    console.log("selectPublicNotification", selectPublicNotification);

    data = {
      adminId: +input,
      userIdRead: userId,
    };

    const userRead = await readMessageAdmin.createUserReadMessage(data);
    if (userRead.userIdRead === userId) {
      return createError({ message: "user read already" });
    }
    console.log("userRead", userRead);
    res.status(200).json(userRead);
  } catch (error) {
    next(error);
  }
};

userController.userReadMessage = async (req, res, next) => {
  try {
    const userId = +req.user.id;
    console.log("userId", userId);
    const readId = +req.params.id;
    console.log("readId", readId);
    const findMessage = await inboxMessageUserService.findInboxMessageByUserIdReceiver(userId);
    console.log("findMessage", findMessage);

    const readMessage = await inboxMessageUserService.readMessage(readId, !findMessage.isRead);
    console.log("readMessage", readMessage);
    res.status(201).json(readMessage);
  } catch (error) {
    next(error);
  }
};

userController.getHistoryInbox = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allMessage = await inboxMessageUserService.findInboxMessageByUserIdSender(userId);
    // console.log('allMessage',allMessage)
    res.status(200).json(allMessage);
  } catch (error) {
    next(error);
  }
};

userController.viewDetailYellowCard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const storeProfile = await storeProfileService.findStoreProfileByUserId(userId);
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const haveEvent = await eventServices.findUniqueEventByIdAndStoreProfileId(eventId, storeProfile.id);
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
    const storeProfile = await storeProfileService.findStoreProfileByUserId(userId);
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const myProduct = await productService.getAllProductInStoreProfileId(storeProfile.id);

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
    const storeProfile = await storeProfileService.findStoreProfileByUserId(userId);
    if (!storeProfile) {
      return res.status(400).json({ msg: "StoreProfile invalid" });
    }
    const haveEventInStore = await eventServices.findFirstEventByEventIdAndStoreProfileId(eventId, storeProfile.id);
    if (!haveEventInStore) {
      return res.status(400).json({ msg: "EventId invalid." });
    }

    const haveProductInEvent = await eventItemService.findFirstByEventIdAndProductId(data);
    if (haveProductInEvent) {
      return res.status(400).json({ msg: "Have product in event." });
    }

    const haveProductInStore = await productService.findFirstProductByProductIdAndStoreProfileId(productId, storeProfile.id);
    if (!haveProductInStore) {
      return res.status(400).json({ msg: "This product is not from this store." });
    }

    const item = await eventItemService.createEventItemByEventIdAndProductId(data);
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
      return res.status(403).json({ msg: "Editing of this event is not allowed." });
    }
    if (VoucherList.length === 0) {
      return res.status(404).json({ msg: "Event not having a coupon." });
    }
    const [{ id }] = VoucherList;
    const discounted = await voucherListService.updateDiscountByEventId(id, req.body);
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
      return res.status(403).json({ msg: "Not Authorized to Delete This Event" });
    }

    const deleteInterest = await interestService.deleteManyInterestByEventId(eventId);
    const deleteEventItem = await eventItemService.deleteManyEventItemByEventId(eventId);
    const haveVoucherList = await voucherListService.findFirstVoucherListByEventId(eventId);
    if (haveVoucherList) {
      const deleteVoucherItem = await voucherItemService.deleteManyVoucherItemByVoucherListId(haveVoucherList.id);
      const deleteVoucherList = await voucherListService.deleteManyVoucherListByEventId(eventId);
    }
    const deleteEvent = await eventServices.deleteEventById(eventId);
    res.status(201).json({ msg: "remove success" });
  } catch (err) {
    next(err);
  }
};

userController.eventOfSeller = async (req, res, next) => {
  try {
    const storeProfileId = req.seller.storeProfileId;
    const allMyEvent = await eventServices.findEventsByStoreProfileId(storeProfileId);
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
    const updateProfileImaged = await userService.updateUserByIdAndData(userId, data);
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

userController.editDescriptionStore = async (req, res, next) => {
  try {
    const storeProfileId = req.seller.storeProfileId;
    const data = req.seller.aboutSeller;
    const { id, sellerDescription, description } = await storeProfileService.updateStoreProfileByIdAndData(storeProfileId, data);
    const response = { storeProfileId: id, sellerDescription, description };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

userController.storeReview = async (req, res, next) => {
  try {
    const storeProfileId = req.seller.storeProfileId;
    const allReview = await commentService.findManyCommentAndUserByStoreProfileId(storeProfileId);
    const response = dataFormat.storeReview(allReview);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

userController.sellerCoupon = async (req, res, next) => {
  try {
    const eventId = req.seller.eventId;
    const allCoupon = await voucherListService.findManyVoucherListAndEventAndStoreProfileByEventId(eventId);
    if (allCoupon.length === 0) {
      return res.json([]);
    }
    const response = dataFormat.sellerCoupon(allCoupon);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

userController.editEvent = async (req, res, next) => {
  try {
    const eventId = +req.params.eventId;
    const myEventId = req.seller.eventId;
    const data = req.body;
    const event = myEventId.find((el) => el === eventId);
    if (!event) {
      return res.status(403).json({ msg: "Not Authorized to Edit This Event" });
    }
    if (req.file) {
      data.images = await uploadService.upload(req.file.path);
    }
    const response = await eventServices.updateEventByIdAndData(eventId, data);

    res.status(201).json(response);
  } catch (err) {
    next(err);
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path);
    }
  }
};

userController.myFollower = async (req, res, next) => {
  try {
    const storeProfileId = req.seller.storeProfileId;

    const myFollower = await followService.findManyFollowerAndUserByStoreProfileId(storeProfileId);

    const dataFormatMyFollower = dataFormat.myFollower(myFollower);

    return res.json(dataFormatMyFollower);
  } catch (err) {
    next(err);
  }
};

userController.myFollowerUserId = async (req, res, next) => {
  try {
    const userId = +req.params.userId
    const followerUserId = req.seller.followerUserId

    const haveFollower = followerUserId.find(followerUserId => followerUserId === userId)
    if (!haveFollower) {
      return res.status(400).json({msg:"Don't have this userId"})
    }
    const follower = await followService.findFollowAndUserAndStoreProfileAndEventByUserId(userId);

    const dataFormatFollower = dataFormat.myFollowerId(follower);

    res.json(dataFormatFollower)
  } catch (err) {
    next(err)
  }
};

userController.buyerCreateStore = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const data = req.createStore;

    if (role === "SELLER") {
      return res.status(400).json({ msg: "You already have a store." });
    }

    data.userId = userId;

    const createStoreProfile = storeProfileService.createStoreProfile(data);
    const changeRoleUser = userService.updateRoleById(userId);

    await Promise.all([createStoreProfile, changeRoleUser]);

    return res.json({ msg: "create store success." });
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
