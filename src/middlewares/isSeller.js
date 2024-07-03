exports.isSeller = (req, res, next) => {
    const role = req.user.role;
    if (role !== "SELLER") {
      return res
        .status(403)
        .json({ msg: "You don't have permission." });
    }
    next();
  };