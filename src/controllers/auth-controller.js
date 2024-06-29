const authService = require("../services/auth-services");
const hashService = require("../services/hash-services");
const createError = require("../utils/createError");
const jwtService = require("../services/jwt-services");
const distanceLocationCal = require("../utils/distanceLocation");
const eventServices = require("../services/event-services");
const refactorService = require("../services/refactor-services");
const dataFormat = require("../utils/dataFormat");
const voucherItemService = require("../services/voucherItem-service");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    // get data
    const data = req.body;
    delete data.confirmPassword;
    console.log("data", data);
    const existUser = await authService.findUserByEmail(data.email);
    if (existUser)
      return createError({ message: "email already in use", statusCode: 400 });

    data.password = await hashService.hash(data.password);
    await authService.createUser(data);
    console.log(data.password);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
authController.login = async (req, res, next) => {
  try {
    // find email user
    const { email, password } = req.body;
    const existUser = await authService.findUserByEmail(email);
    if (!existUser)
      createError({ message: "Invalid credential", statusCode: 400 });
    console.log("existUser", existUser.email);

    // find password user
    const isMatch = await hashService.compare(password, existUser.password);
    console.log("isMatch", isMatch);
    if (!isMatch)
      return createError({ message: "Invalid credential", statusCode: 400 });
    delete existUser.password;
    const accessToken = jwtService.sign({ id: existUser.id });
    console.log("accessToken:", accessToken);
    res.status(200).json({ existUser, accessToken });
  } catch (error) {
    next(error);
  }
};

authController.sellerNearMe = async (req, res, next) => {
  try {
    const userLocation = "13.758343972739715,100.5349746040127";
    const range = 13; //km.
    const allEventIsActive = await eventServices.findAllEventByIsActive();
    const seller = refactorService.filterLocationWithinRange(
      allEventIsActive,
      userLocation,
      range
    );
    const storeProfileId = dataFormat.selectStoreProfileId(seller);
    const groupVoucherItem =
      await voucherItemService.groupByVoucherItemByStoreId(storeProfileId);
    const sellerNewFormat = await dataFormat.sellerNearMe(
      seller,
      groupVoucherItem
    );
    res.json(sellerNewFormat);
  } catch (error) {
    next(error);
  }
};

authController.afterClickOnTheEventCard = async (req, res, next) => {
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

module.exports = authController;
