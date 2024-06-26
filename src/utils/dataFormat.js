const dataFormat = {};

dataFormat.sellerNearMe = (oldData) => {
  const newFormat = oldData.map((el,index,arr) => {
    let obj = {};
    obj.id = el.id;
    obj.eventName = el.name;
    obj.eventImage = el.images;
    obj.eventStartDate = el.startDate;
    obj.eventEndDate = el.endDate;
    obj.eventLocation = el.location;

    obj.storeId = el.storeProfile.id;
    obj.storeName = el.storeProfile.name;
    obj.storeCoverImage = el.storeProfile.coverImage;
    obj.storeDescription = el.storeProfile.description;

    obj.sellerId = el.storeProfile.user.id;
    obj.sellerFirstName = el.storeProfile.user.firstName;
    obj.sellerCoverImage = el.storeProfile.user.profileImage;
    obj.countFollower = el.storeProfile.Follow.length;
    obj.countEventOfSeller = arr.length
    obj.countVoucher = 
      el.VoucherList.length == 0 ? 0 : el.VoucherList[0].VoucherItem.length;
    return obj
  });
  return newFormat
};

module.exports = dataFormat;
