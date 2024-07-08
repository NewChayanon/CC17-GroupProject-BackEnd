const express = require("express");
const authController = require("../controllers/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.get("/near-me", authController.sellerNearMe);
authRouter.get("/event/:eventId", authController.afterClickOnTheEventCard);
authRouter.get("/storeProfile/:storeProfileId", authController.storeProfile);
authRouter.get("/search-bar",authController.searchBar)

module.exports = authRouter;
