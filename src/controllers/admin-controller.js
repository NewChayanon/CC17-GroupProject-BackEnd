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
  if(!data) res.status(300).json({message: 'user not found'})
  console.log(data)
  const blockedUserId = await adminService.updateBlock(userId,!data.isBlocked)
  console.log('blockedUserId', blockedUserId)
  res.json(blockedUserId)
 } catch (error) {
  next(error)
 }
};


adminController.createNotification = async (req,res,next) =>{
  try {
    const adminId = req.user.id
    const input = req.body
    
    let data = {...input,userIdSender:adminId}
    const result = await adminService.createMessage(data)
    console.log('data',data)
    console.log('result',result)
    res.status(200).json({message: 'create successful'})
  
  } catch (error) {
    next(error)
  }
};

adminController.getAllMessages = async(req,res,next) =>{
  const text = await adminService.getAllMessages()
  console.log('text',text)
};



adminController.deleteMessages = async(req,res,next) =>{
  const deleteId = +req.params.id
  console.log('deleteId',deleteId)
  const deleteText = await adminService.deleteMessageById(deleteId)
  console.log('deleteText',deleteText)
  res.status(200).json({message: "delete successful"})
};


module.exports = adminController;