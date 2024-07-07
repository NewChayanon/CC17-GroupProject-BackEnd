const storeProfileService = require("../services/storeProfile-service");

exports.isSeller = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "SELLER") {
      return res.status(403).json({ msg: "You don't have permission." });
    }
    const storeProfile = await storeProfileService.findStoreProfileByUserId(
      req.user.id
    );
    const eventId = storeProfile.Events.reduce((acc, { id }) => {
      acc.push(id);
      return acc;
    }, []);
    const productId = storeProfile.Product.reduce((acc, { id }) => {
      acc.push(id);
      return acc;
    }, []);
    const seller = { storeProfileId: storeProfile.id, eventId, productId };
    req.seller = seller;
    next();
  } catch (err) {
    next(err);
  }
};
