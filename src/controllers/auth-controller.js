const { json } = require('express')
const express = require('express')
const authService = require('../services/auth-services')
const hashService = require('../services/hash-services')
const createError = require('../utils/createError')

const authController = {}

authController.register = async (req,res,next)=>{
  try {
    // get data
    const data = req.body
    console.log('data', data)
    const existUser = await authService.findUserByEmail(data.email)
    if(existUser) return createError({message: 'email already in use', statusCode : 400})

    data.password = await hashService.hash(data.password)
    await authService.createUser(data)
    console.log(data.password)
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
  

}
authController.login = async(req,res,next)=>{
  try {
    // find email user
    const {email,password} = req.body
    const existUser = await authService.findUserByEmail(email)
    console.log('existUser', existUser.email,existUser.password)

    // find password user
    const isMatch = await hashService.compare(password,existUser.password)
    if(!isMatch) createError({message: 'Invalid credential', statusCode: 400})
    
    const acessToken = jwtService.sign({id: existUser.id})
    
  } catch (error) {
    
  }
}
authController.getMe = (req,res,next)=>{}

module.exports = authController;