const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/auth-controller");
const { registerValidator, loginValidator, resetValidator } = require("../middlewares/validator");
const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.patch("/reset-password", resetValidator, authController.resetPassword);
authRouter.get("/near-me", authController.sellerNearMe);
authRouter.get("/event/:eventId", authController.afterClickOnTheEventCard);
authRouter.get("/storeProfile/:storeProfileId", authController.storeProfile);
authRouter.get("/search-bar", authController.searchBar);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), authController.googleLogin);

module.exports = authRouter;
