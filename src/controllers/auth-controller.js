const authService = require("../services/auth-services");
const hashService = require("../services/hash-services");
const createError = require("../utils/createError");
const jwtService = require("../services/jwt-services");
const eventServices = require("../services/event-services");
const refactorService = require("../services/refactor-services");
const dataFormat = require("../utils/dataFormat");
const voucherItemService = require("../services/voucherItem-service");
const storeProfileService = require("../services/storeProfile-service");
const { filterLocationWithinRange } = require("../utils/calculate");
const productService = require("../services/product-service");
const { locationValidator } = require("../middlewares/validator");
const { eventWithinToday } = require("../utils/searchByDate");


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
    delete data.password;
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

authController.searchBar = async (req, res, next) => {
  try {
    const searchBy = req.query.searchBy.toLowerCase();
    const searchKeyword = req.query.searchKeyword;
    const when = req.query.when.toLowerCase();

    if (!searchBy || !searchKeyword || !when) {
      return res
        .status(400)
        .json({ msg: "Please fill in complete information." });
    }

    let dataSearchBy = []
    switch (searchBy) {
      case "location":
        const isLocation = locationValidator(searchKeyword)
        if (!isLocation) {
          return res.json({msg:"Search keyword is not location"})
        }
        const searchEvent = await eventServices.findManyEventSelectIdAndLocation()
        const range = 10; //km.
        const seller = filterLocationWithinRange(searchEvent,searchKeyword,range);
        const eventIdByLocation = seller.map(el => el.id)
        const dataSearchByLocation = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInId(eventIdByLocation)
        dataSearchBy = dataSearchByLocation
        break;
      case "product":
        const searchProduct = await productService.findManyProductSelectIdAndName()
        const filterProduct = searchProduct.filter(el => el.name.toUpperCase().includes(searchKeyword.toUpperCase()))
        const eventIdByProduct = []
        filterProduct.map(el => el.EventItem.map(element=>{
          const haveEventId = eventIdByProduct.find(eventId => eventId === element.eventId)
          if (!haveEventId) {
            eventIdByProduct.push(element.eventId)
          }
        }))
        const dataSearchByProduct = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInId(eventIdByProduct)
        dataSearchBy = dataSearchByLocation
        break;
      case "store":
        const searchStore = await storeProfileService.findManyStoreProfileSelectIdAndName()
        const filterStore = searchStore.filter(el => el.name.toUpperCase().includes(searchKeyword.toUpperCase()))
        const storeProfileId = filterStore.map(el => el.id)
        const dataSearchByStore = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInStoreProfileId(storeProfileId)
        dataSearchBy = dataSearchByLocation
        break;
      }
      
      const dateNow = new Date()
      let dataSearchByWhen = []
      console.log(when)
      switch (when){
        case "today":
          dataSearchByWhen = dataSearchBy.filter(event=>eventWithinToday(event,dateNow))
          break;
        case "tomorrow":
          break;
        case "this week":
          break;
        case "this month":
          break;
      }

    const response = dataFormat.searchBar(dataSearchByWhen)

    res.json(response);
  } catch (err) {
    next(err);
  }
};

authController.sellerNearMe = async (req, res, next) => {
  try {
    const userLocation = req.query.userLocation;
    const range = 13; //km.
    const allEventIsActive = await eventServices.findAllEventByIsActive();

    const seller = filterLocationWithinRange(
      allEventIsActive,
      userLocation,
      range
    );

    const storeProfileId = dataFormat.selectStoreProfileId(seller);

    const groupEvent = await eventServices.groupByEventByStoreId(
      storeProfileId
    );
    const groupVoucherItem =
      await voucherItemService.groupByVoucherItemByStoreId(storeProfileId);

    const sellerNewFormat = await dataFormat.sellerNearMe(
      seller,
      groupVoucherItem,
      groupEvent
    );
    res.json(sellerNewFormat);
  } catch (error) {
    next(error);
  }
};

authController.afterClickOnTheEventCard = async (req, res, next) => {
  try {
    const eventId = +req.params.eventId;
    const findEventById = await eventServices.findEventByEventId(eventId);
    if (!findEventById) {
      return res.status(400).json({ msg: "Event invalid." });
    }
    const findEventOther = await eventServices.findManyEventByStoreId(
      findEventById.storeProfile.id,
      eventId
    );
    const newFindEventById = dataFormat.authEventId(
      findEventById,
      findEventOther
    );

    res.json(newFindEventById);
  } catch (err) {
    next(err);
  }
};

authController.storeProfile = async (req, res, next) => {
  try {
    const storeProfileId = +req.params.storeProfileId;
    const infoStoreProfile =
      await storeProfileService.findStoreProfileByStoreProfileId(
        storeProfileId
      );
    if (!infoStoreProfile) {
      return res.status(400).json({ msg: "Store profile invalid." });
    }
    const result = dataFormat.authStoreProfileId(infoStoreProfile);
    res.json(result);
  } catch (err) {
    next(err);
  }
};



module.exports = authController;
