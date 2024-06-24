const express = require('express')

const authController = {}

authController.register = (req,res,next)=>{
  const data = req.body
  console.log('data', data)
}
authController.login = (req,res,next)=>{}
authController.getMe = (req,res,next)=>{}

module.exports = authController;