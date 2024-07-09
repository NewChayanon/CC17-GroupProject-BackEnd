const fs = require("fs/promises");
exports.deleteImage = (req) => {
  if (req.files?.eventImage) {
    fs.unlink(req.files.eventImage[0].path,(err) => {
      if (err) next(err);
    });
  }
  if (req.files?.voucherImage) {
    fs.unlink(req.files.voucherImage[0].path,(err) => {
      if (err) next(err);
    });
  }
  if (req.file?.eventImage) {
    fs.unlink(req.files.eventImage[0].path,(err) => {
      if (err) next(err);
    });
  }
};
