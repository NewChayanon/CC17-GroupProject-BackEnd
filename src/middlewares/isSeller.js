const storeProfileService = require("../services/storeProfile-service");

exports.isSeller = async (req, res, next) => {
  try {
    const { role, id: userId } = req.user;
    if (role !== "SELLER") {
      return res.status(403).json({ msg: "You don't have permission." });
    }

    const storeProfile = await storeProfileService.findStoreProfileByUserId(userId);
    if (!storeProfile) {
      return res.status(404).json({ msg: "Store profile not found!!!" });
    }

    const eventId = storeProfile.Events.map(({ id }) => id);
    const productId = storeProfile.Product.map(({ id }) => id);

    req.seller = { storeProfileId: storeProfile.id, eventId, productId };
    return next();
  } catch (err) {
    return next(err);
  }
};
