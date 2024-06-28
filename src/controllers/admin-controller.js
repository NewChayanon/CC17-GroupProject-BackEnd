const adminService = require('../services/admin-service');
const userService = require('../services/user-service');
const adminController = {}


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

adminController.statusMessage = async(req,res,next) =>{
  try {
   const userId = +req.params.userId
   console.log(userId)
   const data = await userService.findUserId(userId)
   console.log(data)
   const statusMessage = await adminService.updateStatus(userId,!data.statusMessage)
   console.log('statusMessage', statusMessage)
   res.json(statusMessage)
  } catch (error) {
   next(error)
  }
 };

adminController.createNotification = async (req,res,next) =>{
  try {
    const adminId = req.user.id
    const input = req.body
    
    let data = {...input,userIdSender:adminId,userIdReceiver:2}
    const result = await adminService.createMessage(data)
    console.log('data',data)
    console.log('result',result)
    res.status(200).json({message: 'create successful'})
  
  } catch (error) {
    next(error)
  }
};

module.exports = adminController;