const Joi = require("joi");

exports.userReport = Joi.object({
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

exports.userComment = Joi.object({
  topic: Joi.string().required(),
  comment: Joi.string().required(),
  rate: Joi.string().required(),
  isVerify: Joi.boolean(),
});

exports.sellerEditDiscount = Joi.object({
  discount: Joi.number().required(),
});

exports.aboutSeller = Joi.object({
  sellerDescription: Joi.string(),
  description: Joi.string(),
});

exports.editEvent = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  startDate: Joi.date().min("now"),
  endDate: Joi.date().min("now"),
});
