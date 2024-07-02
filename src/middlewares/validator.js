const createError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const { userReport } = require("../validators/user-validator");

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

exports.validateUpdateProfileOrProfileImage = (req,res,next)=>{
  if(!req.files) return createError({message: 'at least one of profile', statusCode: 400})
  next()
}

exports.userReportValidator = (req,res,next)=>{
  if (!req.file) {
    return res.status(400).json({msg:"at least one of report image"})
  }
  
  const { value, error } = userReport.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.report = value;
  next();
}