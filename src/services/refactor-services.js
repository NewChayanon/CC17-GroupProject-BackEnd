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

refactorService.eventId = (findEventById, findEventOther) => {
  const newFindEventById = {};
  console.log(findEventById);
  newFindEventById.id = findEventById.id;
  newFindEventById.eventName = findEventById.name;
  newFindEventById.eventImage = findEventById.images;
  newFindEventById.eventStartDate = findEventById.startDate;
  newFindEventById.eventEndDate = findEventById.endDate;
  newFindEventById.eventLocation = findEventById.location;
  newFindEventById.voucherCode = findEventById.VoucherList[0].code;
  newFindEventById.voucherCondition = findEventById.VoucherList[0].condition;
  newFindEventById.sellerId = findEventById.storeProfile.user.id;
  newFindEventById.sellerFirstName = findEventById.storeProfile.user.firstName;
  newFindEventById.sellerDisplayName =
    findEventById.storeProfile.user.displayName;
  newFindEventById.storeCoverImage = findEventById.storeProfile.coverImage;
  newFindEventById.storeDescription = findEventById.storeProfile.description;
  
  const newEventList = findEventById.EventItem.map((el) => {
    const obj = {};
    obj.productId = el.id
    obj.productName = el.products.name
    obj.productImage = el.products.image
    obj.productDescription = el.products.description
    obj.price = el.price
    return obj
  });
  const newFindEventOther = findEventOther.map((el) => {
    const obj = {};
    obj.id = el.id;
    obj.eventStartDate = el.startDate;
    obj.eventEndDate = el.endDate;
    obj.eventLocation = el.location;
    obj.interest = el.Interest.length == 0 ? false : true;
    return obj;
  });
  newFindEventById.eventList = newEventList
  newFindEventById.eventOther = newFindEventOther;
  console.log(newFindEventById);
  return newFindEventById;
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
