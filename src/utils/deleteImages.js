const fs = require("fs/promises");
exports.deleteImage = (req) => {
  if (req.files.eventImage) {
    fs.unlink(req.files.eventImage[0].path);
  }
  if (req.files.voucherImage) {
    fs.unlink(req.files.voucherImage[0].path);
  }
};
