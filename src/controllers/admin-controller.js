const adminService = require('../services/admin-service');
const userService = require('../services/user-service');
const adminController = {}

adminController.getAllUser = async(req,res,next) =>{
  try {
    const BuyerAndSeller = await adminService.getAllBuyerAndSeller()
    console.log('BuyerAndSeller',BuyerAndSeller)
    res.status(200).json({BuyerAndSeller})
  } catch (error) {
    next(error)
  }
};


adminController.getSeller = async(req,res,next) =>{
  try {
    const seller = await adminService.getSeller()
    console.log('seller',seller)
    res.status(201).json(seller)
  } catch (error) {
    next(error)
  }
};

adminController.getBuyer = async (req,res,next) =>{
  try {
    const buyer = await adminService.getBuyer()
    console.log('buyer',buyer)
    res.status(201).json(buyer)
  } catch (error) {
    next(error)
  }
};

adminController.blocked = async(req,res,next) =>{
 try {
  const userId = +req.params.userId
  console.log(userId)
  const data = await userService.findUserId(userId)
  console.log(data)
  const blockedUserId = await adminService.updateBlock(userId,!data.isBlocked)
  console.log('blockedUserId', blockedUserId)
  res.json(blockedUserId)
 } catch (error) {
  next(error)
 }
};

adminController.notification = (req,res,next) =>{};

module.exports = adminController;