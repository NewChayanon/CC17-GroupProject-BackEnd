const distanceLocationCal = require("../utils/distanceLocation");

const refactorService = {};

refactorService.eventInterest = (data) => {
  const eventInterest = data.map((el) => {
    const obj = {};
    obj.id = el.id;
    obj.eventName = el.event.name;
    obj.eventImage = el.event.images;
    obj.eventStartDate = el.event.startDate;
    obj.eventEndDate = el.event.endDate;
    obj.sellerId = el.event.storeProfile.id;
    obj.sellerFirstName = el.event.storeProfile.user.firstName;
    obj.sellerCoverImage = el.event.storeProfile.user.profileImage;
    obj.getVoucher = el.event.VoucherList.length == 0 ? false : true;
    return obj;
  });
  return eventInterest;
};



refactorService.filterLocationWithinRange = (
  allEventIsActive,
  userLocation,
  range
) =>
  allEventIsActive.filter(
    (el) => distanceLocationCal(userLocation, el.location) < range
  );

module.exports = refactorService;
