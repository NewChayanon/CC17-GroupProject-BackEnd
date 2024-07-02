const Joi = require("joi");

exports.userReport = Joi.object({
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
