const fs = require("fs/promises");
const createError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const {
  userReport,
  userComment,
  sellerEditDiscount,
  aboutSeller,
  editEvent,
  createEvent,
} = require("../validators/user-validator");
const { deleteImage } = require("../utils/deleteImages");
const eventServices = require("../services/event-services");

exports.registerValidator = (req, res, next) => {
  console.log(req.body);
  const { value, error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.input = value;
  next();
};

exports.loginValidator = (req, res, next) => {
  console.log(req.body);
  const { value, error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.input = value;
  next();
};

exports.validateCoverImage = (req, res, next) => {
  if (!req.files)
    return createError({
      message: "at least one of cover image",
      statusCode: 400,
    });
  next();
};

exports.imagesOfCreateEventValidator = (req, res, next) => {
  if (!req.files.eventImage) {
    deleteImage(req);
    return res.status(400).json({ msg: "At least one of event cover image." });
  }

  if (req.files.voucherImage || req.body.voucher) {
    if (!req.files.voucherImage || !req.body.voucher) {
      deleteImage(req);
      return res
        .status(400)
        .json({ msg: "Must include both a voucher image and voucher detail." });
    }
  }
  next();
};

exports.validateUpdateProfileOrProfileImage = (req, res, next) => {
  if (!req.files)
    return createError({
      message: "at least one of profile image",
      statusCode: 400,
    });
  next();
};

exports.userReportValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ msg: "at least one of report image" });
  }

  const { value, error } = userReport.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.report = value;
  next();
};

exports.commentValidator = (req, res, next) => {
  const { value, error } = userComment.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.comment = value;
  next();
};

exports.validateEditDiscount = (req, res, next) => {
  const { value, error } = sellerEditDiscount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.voucherList = value;
  next();
};

exports.singleProfileImageValidator = (req, res, next) => {
  if (!req.file)
    return createError({ message: "at least one of profile", statusCode: 400 });
  next();
};

exports.singleCoverImageValidator = (req, res, next) => {
  if (!req.file)
    return createError({
      message: "at least one of cover image.",
      statusCode: 400,
    });
  next();
};

exports.editAboutSellerAndStoreValidator = (req, res, next) => {
  const { value, error } = aboutSeller.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.seller.aboutSeller = value;
  next();
};

exports.editEventValidator = async (req, res, next) => {
  try {
    if (req.body.startDate || req.body.endDate) {
      const { startDate, endDate } = await eventServices.findFirstEventById(
        +req.params.eventId
      );

      const thaiTimeOffset = 7 * 60 * 60 * 1000;
      const now = new Date(new Date().getTime() + thaiTimeOffset);

      if (req.body.startDate && startDate < now) {
        deleteImage(req);
        return res.status(400).json({ msg: "Event in progress." });
      }

      if (req.body.startDate && new Date(req.body.startDate) < now) {
        deleteImage(req);
        return res.status(400).json({ msg: "Start date greater now." });
      }

      if (req.body.startDate && req.body.endDate) {
        if (new Date(req.body.endDate) < new Date(req.body.startDate)) {
          deleteImage(req);
          return res.status(400).json({ msg: "End date greater Start Date." });
        }
      } else if (new Date(req.body.startDate) > endDate) {
        deleteImage(req);
        return res.status(400).json({ msg: "Start date invalid." });
      } else if (new Date(req.body.endDate) < startDate) {
        deleteImage(req);
        return res.status(400).json({ msg: "End date invalid." });
      } else if (!req.body.startDate) {
        req.body.startDate = startDate;
      }
    }

    if (req.body.openTime || req.body.closingTime) {
      if (!req.body.openTime || !req.body.closingTime) {
        deleteImage(req);
        return res
          .status(400)
          .json({ msg: "Required OpenTime Or ClosingTime." });
      }
      const openTime = req.body.openTime.split("T")[0];
      const closingTime = req.body.closingTime.split("T")[0];
      if (openTime !== closingTime) {
        deleteImage(req);
        return res
          .status(400)
          .json({ msg: "OpenTime Or ClosingTime Invalid." });
      }
    }

    const { value, error } = editEvent.validate(req.body);
    if (error) {
      deleteImage(req);
      return res.status(400).json({ message: error.details[0].message });
    }
    req.seller.editEvent = value;
    next();
  } catch (err) {
    next(err);
  }
};

exports.createEventValidator = (req, res, next) => {
  if (req.body.eventItem) {
    const newEventItem = JSON.parse(req.body.eventItem);
    req.body.eventItem = newEventItem;
  }
  if (req.files.voucherImage && req.body.voucher) {
    const newVoucher = JSON.parse(req.body.voucher);
    req.body.voucher = newVoucher;
  }
  if (!req.body.openTime || !req.body.closingTime) {
    deleteImage(req);
    return res.status(400).json({ msg: "Required OpenTime Or ClosingTime." });
  }

  const openTime = req.body.openTime.split("T")[0];
  const closingTime = req.body.closingTime.split("T")[0];
  if (openTime !== closingTime) {
    deleteImage(req);
    return res.status(400).json({ msg: "OpenTime Or ClosingTime Invalid." });
  }

  const { value, error } = createEvent.validate(req.body);
  if (error) {
    deleteImage(req);
    return res.status(400).json({ message: error.details[0].message });
  }
  req.seller.createEvent = value;
  next();
};
