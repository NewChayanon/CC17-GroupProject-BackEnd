const express = require('express')
const userController = require('../controllers/user-controller')
const userRouter = express.Router()

userRouter.get('/event',userController.findEventListOfUser)
userRouter.get('/event/:eventId',userController.afterClickOnTheEventCard)

module.exports = userRouter