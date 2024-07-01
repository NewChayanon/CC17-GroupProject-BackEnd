const fs = require('fs/promises');
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
const uploadService = require('../services/upload-service')
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

    const findUserId = await storeProfileService.findStoreProfileByUserId(userId)
    console.log('findUserId',findUserId)
    if(findUserId) createError(res.status(300).json({message: "Not allowed to create store you have store already"}))

    const promises = [];
    if(req.files.coverImage){
      const result = uploadService.upload(req.files.coverImage[0].path).then(url =>({url, key: 'coverImage'}))
      promises.push(result)
    }

    const result = await Promise.all(promises)
    console.log('result',result)
    const data = result.reduce((acc,item)=>{
      acc[item.key]= item.url
      return acc
    },{})

    const input = {
      userId: userId,
      name: req.body.name,
      coverImage: data.coverImage,
      sellerDescription: req.body.sellerDescription,
      description: req.body.description
    }
    const createStoreProfile = await storeProfileService.createStoreProfile(+req.body.userId, input);
    console.log("createStoreProfile", createStoreProfile);
    res.status(200).json({ message: "create store complete!!!." });
  } catch (error) {
    next(error);
  }finally{
    console.log(req.files.coverImage[0].path)
    if(req.files.coverImage){
      fs.unlink(req.files.coverImage[0].path)
    }
  }
};

userController.updateCoverImage = async (req,res,next) =>{
  try{
    const promises = [];
    console.log(req.files)
    if(req.files.coverImage){
      const result = uploadService.upload(req.files.coverImage[0].path).then(url =>({url, key: 'coverImage'}))
      promises.push(result)
    }

    const result = await Promise.all(promises)
    console.log(result)
    const data = result.reduce((acc,item)=>{
      acc[item.key]= item.url
      return acc
    },{})
    console.log('data1',data)
    await userService.updateCoverImageById(+req.body.userId, data);
    console.log('first3')
    res.status(200).json(data)
  }catch(err){
    next(err)
  } finally{
    console.log(req.files.coverImage[0].path)
    if(req.files.coverImage){
      fs.unlink(req.files.coverImage[0].path)
    }
  }
}

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

module.exports = userController;
