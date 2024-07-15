const shortid = require("shortid");

const generateShortID = (length) => {
  let id = shortid.generate();
  return id.substring(0, length);
};

exports.shortID = (length) => generateShortID(length);
