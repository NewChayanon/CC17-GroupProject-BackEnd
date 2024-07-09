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
  startDate: Joi.date(),
  endDate: Joi.date().min("now"),
  openTime: Joi.date(),
  closingTime: Joi.date().greater(Joi.ref("openTime")),
});

exports.createEvent = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  locationName: Joi.string().required(),
  startDate: Joi.date().min("now").required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  openTime: Joi.date().required(),
  closingTime: Joi.date().greater(Joi.ref("openTime")).required(),
  eventItem: Joi.array()
    .items(Joi.object({ productId: Joi.number().required() }))
    .required(),
  voucher: Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    condition: Joi.string().required(),
    totalAmount: Joi.number().required(),
    description: Joi.string().required(),
    discount: Joi.number().required(),
  }),
});

exports.createStore = Joi.object({
  name: Joi.string().required(),
  storeProductType: Joi.string().required(),
});
