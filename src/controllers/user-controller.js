const eventServices = require("../services/event-services");
const interestService = require("../services/interest-service");
const refactorService = require("../services/refactor-services");
const userService = require("../services/user-service");

const userController = {};

userController.getMe = async (req, res, next) => {
try {
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];
  console.log('accessToken',accessToken)
  res.status(200).json({ user: req.user,accessToken: accessToken});
} catch (error) {
  next(error)
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

module.exports = userController;
