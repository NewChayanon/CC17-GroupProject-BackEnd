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
const { eventWithinToday, eventWithinTomorrow, eventWithinRange } = require("../utils/searchByDate");
const{ mailer} = require('../config/mailer')

const authController = {};
authController.register = async (req, res, next) => {
  try {
    // get data
    const data = req.body;
    delete data.confirmPassword;
    console.log("data", data);
    const existUser = await authService.findUserByEmail(data.email);
    if (existUser) return createError({ message: "email already in use", statusCode: 400 });

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
    if (!existUser) createError({ message: "Invalid credential", statusCode: 400 });
    console.log("existUser", existUser.email);

    // find password user
    const isMatch = await hashService.compare(password, existUser.password);
    console.log("isMatch", isMatch);
    if (!isMatch) return createError({ message: "Invalid credential", statusCode: 400 });
    delete existUser.password;
    const accessToken = jwtService.sign({ id: existUser.id });
    console.log("accessToken:", accessToken);
    res.status(200).json({ existUser, accessToken });
  } catch (error) {
    next(error);
  }
};

authController.resetPassword = async (req, res, next) => {
  try {
    const data = req.body;
    // find email
    const {email} = await authService.findEmailByEmail(data.email);
    // console.log('email',email)
    if (!email) {
      createError({ message: "Invalid credential", statusCode: 400 });
    }

    // // reset password
    const length = 12;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let temporaryPassword = '';

    // generate random password
    for (let i =0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * chars.length);
      temporaryPassword += chars[randomIndex]
    }
    // console.log('temporaryPassword',temporaryPassword)

    // hash password
    const hashedPassword = await hashService.hash(temporaryPassword)
    // console.log('hashedPassword',hashedPassword.length)
    const convertPassword = await authService.updatePasswordByEmail(data.email,hashedPassword)


    const emailData ={
      from: process.env.GOOGLE_GMAIL,
      to: email,
      subject: "Your Temporary Password",
      text: `Your temporary password is: ${temporaryPassword}. Please log in and change your password.`,
      html: `
      <p>Your temporary password is: <strong>${temporaryPassword}</strong></p>
      <p>Please log in and change your password.</p>
    `,
    };
    // console.log('emailData',emailData)
    const mail = await mailer(emailData);
    // console.log('mail',mail)
    

    return res.status(201).json(convertPassword);

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
      return res.status(400).json({ msg: "Please fill in complete information." });
    }

    let dataSearchBy = [];
    switch (searchBy) {
      case "location":
        const isLocation = locationValidator(searchKeyword);
        if (!isLocation) {
          return res.json({ msg: "Search keyword is not location" });
        }
        const searchEvent = await eventServices.findManyEventSelectIdAndLocation();
        const range = 10; //km.
        const seller = filterLocationWithinRange(searchEvent, searchKeyword, range);
        const eventIdByLocation = seller.map((el) => el.id);
        dataSearchBy = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInId(eventIdByLocation);
        break;
      case "product":
        const searchProduct = await productService.findManyProductSelectIdAndName();
        const filterProduct = searchProduct.filter((el) => el.name.toUpperCase().includes(searchKeyword.toUpperCase()));
        const eventIdByProduct = [...new Set(filterProduct.flatMap((el) => el.EventItem.map((item) => item.eventId)))];
        dataSearchBy = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInId(eventIdByProduct);
        break;
      case "store":
        const searchStore = await storeProfileService.findManyStoreProfileSelectIdAndName();
        const filterStore = searchStore.filter((el) => el.name.toUpperCase().includes(searchKeyword.toUpperCase()));
        const storeProfileId = filterStore.map((el) => el.id);
        dataSearchBy = await eventServices.findManyEventAndStoreProfileAndUserAndFollowAndVoucherItemAndVoucherListInStoreProfileId(storeProfileId);
        break;
    }

    const thaiTimeOffset = 7 * 60 * 60 * 1000;
    const dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + thaiTimeOffset);

    let dataSearchByWhen = [];
    switch (when) {
      case "today":
        dataSearchByWhen = dataSearchBy.filter((event) => eventWithinToday(event, dateNow));
        break;
      case "tomorrow":
        dataSearchByWhen = dataSearchBy.filter((event) => eventWithinTomorrow(event, dateNow));
        break;
      case "this week":
        const weekLater = new Date(dateNow);
        weekLater.setDate(weekLater.getDate() + 7);
        dataSearchByWhen = dataSearchBy.filter((event) => eventWithinRange(event, dateNow, weekLater));
        break;
      case "this month":
        const monthLater = new Date(dateNow);
        monthLater.setMonth(monthLater.getMonth() + 1);
        dataSearchByWhen = dataSearchBy.filter((event) => eventWithinRange(event, dateNow, monthLater));
        break;
    }

    const response = dataFormat.searchBar(dataSearchByWhen);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

authController.sellerNearMe = async (req, res, next) => {
  try {
    const userLocation = req.query.userLocation;
    console.log("******",userLocation)
    const range = 13; //km.
    const allEventIsActive = await eventServices.findAllEventByIsActive();
    const seller = filterLocationWithinRange(allEventIsActive, userLocation, range);

    const storeProfileId = dataFormat.selectStoreProfileId(seller);

    const groupEvent = await eventServices.groupByEventByStoreId(storeProfileId);
    const groupVoucherItem = await voucherItemService.groupByVoucherItemByStoreId(storeProfileId);

    const sellerNewFormat = await dataFormat.sellerNearMe(seller, groupVoucherItem, groupEvent);
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
    const findEventOther = await eventServices.findManyEventByStoreId(findEventById.storeProfile.id, eventId);
    const newFindEventById = dataFormat.authEventId(findEventById, findEventOther);

    res.json(newFindEventById);
  } catch (err) {
    next(err);
  }
};

authController.storeProfile = async (req, res, next) => {
  try {
    const storeProfileId = +req.params.storeProfileId;
    const infoStoreProfile = await storeProfileService.findStoreProfileByStoreProfileId(storeProfileId);
    if (!infoStoreProfile) {
      return res.status(400).json({ msg: "Store profile invalid." });
    }
    const result = dataFormat.authStoreProfileId(infoStoreProfile);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

authController.googleLogin = async (req, res, next) => {
  try {
    const accessToken = jwtService.sign({ id: req.user.dbId });
    const encoded = encodeURIComponent(accessToken);
    res.redirect(`http://localhost:${process.env.PORT_FRONT_END || 5173}/home?token=${encoded}`);
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
