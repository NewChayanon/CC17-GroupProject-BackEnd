const { voucherItem } = require("../models/prisma");
const eventServices = require("../services/event-services");
const inboxMessageService = require("../services/inboxMessage-service");
const interestService = require("../services/interest-service");
const refactorService = require("../services/refactor-services");
const userService = require("../services/user-service");
const voucherItemService = require("../services/voucherItem-service");

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

userController.afterClickOnTheEventCard = async (req, res, next) => {
  try {
    const eventId = +req.params.eventId;
    console.log(eventId);
    const findEventById = await eventServices.findEventByEventId(eventId);
    const findEventOther = await eventServices.findManyEventByStoreId(
      findEventById.storeProfile.id
    );
    const newFindEventById = refactorService.eventId(
      findEventById,
      findEventOther
    );

    res.json(newFindEventById);
  } catch (err) {
    next(err);
  }
};

userController.interested = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
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
    res.json({ mes: "Uninterested success" });
  } catch (error) {
    next(error);
  }
};

userController.fetchAllInbox = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allInbox = await inboxMessageService.findManyInboxMessageByUserId(
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
    const haveMessage = await inboxMessageService.findInboxMessageById(inboxId);
    if (!haveMessage)
      return res.status(404).json({ msg: "Don't have message" });
    const removeMessaged =
      await inboxMessageService.removeInboxMessageByInboxId(inboxId);
    res.status(204).json({ msg: "Removed" });
  } catch (err) {
    next(err);
  }
};


userController.getNotificationPublic =async (req,res,next)=>{
  const userId = req.user.id
  if(req.user.role === 'ADMIN') res.status(300).json({message: 'not allowed to access'})
  const result = await userService.findUserId(userId)

  if(!result) res.status(300).json({message: 'user is not defined' })
  if(result.statusMessage || result.isBlocked) res.status(300).json({message: 'No receive Notification'})

  const publicNotification = await userService.getPublicNotification()
  console.log('publicNotification',publicNotification)
  res.status(200).json(publicNotification)
  console.log('result', result)
};


userController.keepCoupon = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const event = await eventServices.findEventByEventId(eventId);
    const haveCoupon = await voucherItemService.findVoucherItemByUserIdAnd(
      event.VoucherList[0].id,
      event.storeProfile.id,
      userId
    );
    if (haveCoupon) {
      return res.status(204).json({ msg: "You have coupon" });
    }
    const keepCoupon =
      await voucherItemService.createVoucherItemByVoucherListIdAndStoreProfileIdAndUserId(
        event.VoucherList[0].id,
        event.storeProfile.id,
        userId
      );
    res.status(204).json({ msg: "Keep coupon success" });
  } catch (err) {
    next(err);
  }
};


module.exports = userController;
