const express = require("express");
const adminController = require("../controllers/admin-controller");
const { authenticate } = require("../middlewares/authenticate");

const adminRouter = express.Router();

adminRouter.get("/allUser", adminController.getAllUser);
adminRouter.get("/seller", adminController.getSeller);
adminRouter.get("/buyer", adminController.getBuyer);
adminRouter.patch("/block/:userId", adminController.blocked);
adminRouter.get("/all-events", adminController.getAllEvents);
adminRouter.post("/new-message", adminController.createNotification);
adminRouter.get("/all-messages", adminController.getAllMessages);
adminRouter.delete("/deleteMessage/:id", adminController.deleteMessages);

module.exports = adminRouter;
