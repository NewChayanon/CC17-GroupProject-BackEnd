const jwt = require("jsonwebtoken");

const jwtService = {};

jwtService.createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });

jwtService.checkToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = jwtService;