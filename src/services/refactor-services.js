const refactorService = {};

refactorService.eventInterest = (data) =>{
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
        obj.getVoucher = el.event.VoucherList.length == 0 ? false : true
        return obj;
      });
      return eventInterest
}

refactorService.eventId = (findEventById, findEventOther) => {
  const newFindEventById = {};
  newFindEventById.id = findEventById.id;
  newFindEventById.eventName = findEventById.name;
  newFindEventById.eventImage = findEventById.images;
  newFindEventById.eventStartDate = findEventById.startDate;
  newFindEventById.eventEndDate = findEventById.endDate;
  newFindEventById.eventLocation = findEventById.location;
  newFindEventById.condition = findEventById.VoucherList.condition;
  newFindEventById.sellerId = findEventById.storeProfile.user.id;
  newFindEventById.sellerFirstName = findEventById.storeProfile.firstName;
  newFindEventById.DisplayName = findEventById.storeProfile.user.displayName;
  newFindEventById.CoverImage = findEventById.storeProfile.images;
  const newFindEventOther = findEventOther.map((el) => {
    const obj = {};
    obj.id = el.id;
    obj.eventStartDate = el.startDate;
    obj.eventEndDate = el.endDate;
    obj.eventLocation = el.location;
    obj.interest = el.Interest.length == 0 ? false : true;
    return obj;
  });
  newFindEventById.eventOther = newFindEventOther;
  return newFindEventById;
};

module.exports = refactorService;
