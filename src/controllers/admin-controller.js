const prisma = require("../models/prisma");
const adminService = require("../services/admin-service");
const eventServices = require("../services/event-services");
const userService = require("../services/user-service");
const createError = require("../utils/createError");
const adminController = {};

adminController.getAllUser = async (req, res, next) => {
  try {
    const buyerAndSeller = await adminService.getAllBuyerAndSeller();
    console.log("BuyerAndSeller", buyerAndSeller);
    res.status(200).json(buyerAndSeller);
  } catch (error) {
    next(error);
  }
};

adminController.getSeller = async (req, res, next) => {
  try {
    const pages = +req.query.pages;
    const pageSize = +req.query.pageSize;
    const sortBy = req.query.sortBy;
    console.log("sortBy", sortBy);
    const seller = await adminService.getSeller(pages, pageSize, sortBy);
    console.log("seller", seller);

    const result = seller.map(user => ({
      id: user.id,
      storeProfileId: user.StoreProfile?.id,
      profileImage: user.profileImage,
      email: user.email,
      displayName: user.displayName,
      isBlocked: user.isBlocked,
      updatedAt: user.updatedAt
    }));
    console.log('result',result)


    const countSeller = await prisma.users.count({ where: { role: "SELLER" } });
    res.status(200).json({ result, countSeller });
  } catch (error) {
    next(error);
  }
};

adminController.getBuyer = async (req, res, next) => {
  try {
    const pages = +req.query.pages;
    const pageSize = +req.query.pageSize;
    const sortBy = req.query.sortBy;
    console.log("sortBy", sortBy);
    const buyer = await adminService.getBuyer(pages, pageSize, sortBy);
    console.log('buyer',buyer)

    const result = buyer.map(user => ({
      id: user.id,
      storeProfileId: user.StoreProfile ? user.StoreProfile.id: "N/A",
      profileImage: user.profileImage,
      email: user.email,
      displayName: user.displayName,
      isBlocked: user.isBlocked,
      updatedAt: user.updatedAt
    }));

    console.log('result',result)
    const countBuyer = await prisma.users.count({ where: { role: "BUYER" } });
    res.status(200).json({ result, countBuyer });
  } catch (error) {
    next(error);
  }
};

adminController.getAllEvents = async (req, res, next) => {
  try {
    const countActiveEvents = await eventServices.countActive();
    const countIsActiveEvents = await eventServices.countIsActive();
    AllEvents = countActiveEvents + countIsActiveEvents;
    res.status(200).json({ AllEvents, countActiveEvents, countIsActiveEvents });
  } catch (error) {
    next(error);
  }
};

adminController.upComingEvent = async (req, res, next) => {
  try {
    const countUpcomingEvents = await eventServices.countIsActive();
    res.status(201).json(countUpcomingEvents);
  } catch (error) {
    next(error);
  }
};

adminController.blocked = async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    console.log(userId);
    const data = await userService.findUserId(userId);
    if (!data) res.status(300).json({ message: "user not found" });
    console.log(data);
    const blockedUserId = await adminService.updateBlock(userId, !data.isBlocked);
    console.log("blockedUserId", blockedUserId);
    res.json(blockedUserId);
  } catch (error) {
    next(error);
  }
};

adminController.createNotification = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const input = req.body;

    let data = { ...input, userIdSender: adminId };
    const result = await adminService.createMessage(data);
    console.log("data", data);
    console.log("result", result);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

adminController.getAllMessages = async (req, res, next) => {
  try {
    const text = await adminService.getAllMessages();
    console.log("text", text);
    res.status(200).json(text);
  } catch (error) {
    next(error);
  }
};

adminController.deleteMessages = async (req, res, next) => {
  const deleteId = +req.params.id;
  console.log("deleteId", deleteId);
  const deleteText = await adminService.deleteMessageById(deleteId);
  console.log("deleteText", deleteText);
  res.status(200).json({ message: "delete successful" });
};

module.exports = adminController;
