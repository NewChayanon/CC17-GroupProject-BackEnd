const createError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../validators/auth-validator");

exports.registerValidator = (req,res,next)=>{
  console.log(req.body)
  const {value, error} = registerSchema.validate(req.body)
  if (error) return res.status(400).json({message : error.details[0].message });
  req.input = value
  next();
};


exports.loginValidator = (req,res,next)=>{
  console.log(req.body)
  const {value, error} = loginSchema.validate(req.body)
  if (error) return res.status(400).json({message : error.details[0].message });
  req.input = value
  next();
};

exports.validateCoverImage = (req,res,next)=>{
  if(!req.files) return createError({message: 'at least one of cover image', statusCode: 400})
  next()
}
