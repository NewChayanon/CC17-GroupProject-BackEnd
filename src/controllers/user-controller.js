const eventServices = require("../services/event-services");
const interestService = require("../services/interest-service");
const userService = require("../services/user-service");

const userController = {};


userController.getMe = (req,res,next)=>{
    res.status(200).json({user: req.user})
}

userController.findEventListOfUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userInterest = await interestService.findInterestByUserId(user.id);
    console.log(userInterest);
    // res-frontEnd => [{id,eventName,eventImage,eventStartDate,eventEndDate,sellerId,sellerFirstName,sellerCoverImage}]

    const eventInterest = userInterest.map((el) => {
      const obj = {};
      obj.id = el.id;
      obj.eventName = el.event.name;
      obj.eventImage = el.event.images;
      obj.eventStartDate = el.event.startDate;
      obj.eventEndDate = el.event.endDate;
      obj.sellerId = el.event.storeProfile.id;
      obj.sellerFirstName = el.event.storeProfile.user.firstName;
      obj.sellerCoverImage = el.event.storeProfile.user.profileImage;
      return obj;
    });

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

    const newFindEventById = {};

    newFindEventById.id = findEventById.id;
    newFindEventById.eventName = findEventById.name;
    newFindEventById.eventImage = findEventById.images;
    newFindEventById.eventStartDate = findEventById.startDate;
    newFindEventById.eventEndDate = findEventById.endDate;
    newFindEventById.eventLocation = findEventById.location;
    //   newFindEventById.condition = findEventById.VoucherList.condition
    newFindEventById.sellerId = findEventById.storeProfile.user.id;
    newFindEventById.sellerFirstName = findEventById.storeProfile.firstName;
    newFindEventById.DisplayName = findEventById.storeProfile.user.displayName;
    newFindEventById.CoverImage = findEventById.storeProfile.images;

    const newFindEventOther = findEventOther.map((el) => {
      const obj = {}
      obj.id = el.id
      obj.eventStartDate = el.startDate;
      obj.eventEndDate = el.endDate;
      obj.eventLocation = el.location;
      obj.interest = el.Interest.length == 0 ? false : true
      return obj
    });

    newFindEventById.eventOther = newFindEventOther
    res.json(newFindEventById);
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
