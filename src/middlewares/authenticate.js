
const jwtService = require("../services/jwt-services");
const userService = require("../services/user-service");

exports.authenticate = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      console.log("*********",authorization)
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "unauthenticated" });
      }
  
      const accessToken = authorization.split(" ")[1];
      console.log("-------------",accessToken)
      const payload = jwtService.verify(accessToken);
      console.log(payload)
      const searchUser = await userService.findUserId(payload.id);
      if (!searchUser) {
        return res.status(400).json({ msg: "user was not found" });
      }
      delete searchUser.password
      req.user = searchUser
      next()
    } catch (error) {
      console.log(error);
      next(error)
    }
  };