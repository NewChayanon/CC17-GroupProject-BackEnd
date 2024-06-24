const Joi = require('joi');

exports.registerSchema = Joi.object({
  firstName : Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email : Joi.string().email({tlds: false}).required().strip(),
  password : Joi.string().required().pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+?]{6,}$/),
  confirmPassword : Joi.string().required().valid(Joi.ref('password')).strip(),
  mobile : Joi.string().pattern(/^[0-9]{10}$/),
  role: Joi.string()
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
