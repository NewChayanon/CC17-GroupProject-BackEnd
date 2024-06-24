const express = require('express');
const authController = require('../controllers/auth-controller');
const authRouter = express();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.getMaxListeners('/me', authController.getMe)

module.exports = authRouter