const express = require('express')
const userController = require('../controllers/user-controller')
const userRouter = express.Router()

userRouter.get('/me', userController.getMe)
userRouter.get('/event',userController.findEventListOfUser)

module.exports = userRouter