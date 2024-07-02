const Joi = require("joi");

exports.userReport = Joi.object({
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

exports.userComment = Joi.object({
  topic: Joi.string().required(),
  comment: Joi.string().required(),
  rate: Joi.string().required(),
  isVerify:Joi.boolean()
});
