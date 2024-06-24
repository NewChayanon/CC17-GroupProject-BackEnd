const { json } = require('express')
const express = require('express')
const authService = require('../services/auth-services')
const hashService = require('../services/hash-services')

const authController = {}

authController.register = async (req,res,next)=>{
  try {
    // get data
    const data = req.body
    console.log('data', data)
    const existUser = await authService.findUserByEmail(data.email)
    if(existUser) return res.json({message: 'email already in use', statusCode : 400})

    data.password = await hashService.hash(data.password)
    await authService.createUser(data)
    console.log(data.password)
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
  

}
authController.login = (req,res,next)=>{}
authController.getMe = (req,res,next)=>{}

module.exports = authController;