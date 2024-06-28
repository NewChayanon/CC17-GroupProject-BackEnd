const eventServices = require("../services/event-services");
const inboxMessageService = require("../services/inboxMessage-service");
const interestService = require("../services/interest-service");
const refactorService = require("../services/refactor-services");
const userService = require("../services/user-service");

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

userController.uninterested = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const eventId = +req.params.eventId;
    const interestId = await interestService.findInterestedByUserIdAndEventId(
      userId,
      eventId
    );
    if (!interestId) {
      return res.status(404).json({ msg: "InterestId invalid" });
    }
    const uninterestedEvent = await interestService.deleteInterestById(
      interestId.id
    );
    res.json(uninterestedEvent);
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


userController.getAllUser = async(req,res,next) =>{
  try {
    const BuyerAndSeller = await userService.getAllBuyerAndSeller()
    console.log('BuyerAndSeller',BuyerAndSeller)
    res.status(200).json({BuyerAndSeller})
  } catch (error) {
    next(error)
  }
};

userController.getSeller = async(req,res,next) =>{
  try {
    const seller = await userService.getSeller()
    console.log('seller',seller)
    res.status(201).json(seller)
  } catch (error) {
    next(error)
  }
};

userController.getBuyer = async (req,res,next) =>{
  try {
    const buyer = await userService.getBuyer()
    console.log('buyer',buyer)
    res.status(201).json(buyer)
  } catch (error) {
    next(error)
  }
};

module.exports = userController;
