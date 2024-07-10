const session = require("express-session");
exports.sessionGoogleLogin = () =>
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  });
