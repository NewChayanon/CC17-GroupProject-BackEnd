const dataFormat = {};

dataFormat.sellerNearMe = (oldData, groupVoucherItem, groupEvent) => {
  const newFormat = oldData.map((el) => {
    const countEventOfSeller = groupEvent.find(
      (element) => element.storeProfileId === el.storeProfileId
    )._count.storeProfileId;

    const sumVoucherSeller = groupVoucherItem.find(
      (element) => element.storeProfileId === el.storeProfileId
    )._count.storeProfileId;

    const countVoucherThisEvent =
      el.VoucherList.length === 0 ? 0 : el.VoucherList[0].VoucherItem.length;

    return {
      id: el.id,
      eventName: el.name,
      eventImage: el.images,
      eventStartDate: el.startDate,
      eventEndDate: el.endDate,
      eventLocation: el.location,
      eventDescription: el.description,

      storeId: el.storeProfile.id,
      storeName: el.storeProfile.name,
      storeCoverImage: el.storeProfile.coverImage,
      storeDescription: el.storeProfile.description,

      sellerId: el.storeProfile.user.id,
      sellerFirstName: el.storeProfile.user.firstName,
      sellerCoverImage: el.storeProfile.user.profileImage,
      countFollower: el.storeProfile.Follow.length,
      countEventOfSeller,
      countVoucherThisEvent,
      sumVoucherSeller,
    };
  });

  return newFormat;
};

dataFormat.selectStoreProfileId = (seller) =>
  seller.map((el) => el.storeProfileId);

dataFormat.allFavoriteList = (allFavorite, allStoreProfileIdInFavorite) => {
  const allFavoriteList = allFavorite.map((el) => ({
    id: el.id,
  }));

  const updatedFavoriteList = allStoreProfileIdInFavorite.map((el, index) => ({
    ...allFavoriteList[index],
    storeImage: el.coverImage,
    storeName: el.name,
    followers: el.Follow.length,
    events: el.Events.length,
    vouchers: el.VoucherItem.length,
    sellerCoverImage: el.user.profileImage,
  }));

  return updatedFavoriteList;
};

dataFormat.userEventId = (event, otherEvents) => {
  const {
    id,
    name,
    images,
    startDate,
    endDate,
    location,
    VoucherList,
    storeProfile,
    Interest,
    EventItem,
  } = event;

  const newEvent = {
    id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    eventLocation: location,
    voucherCode: VoucherList.length ? VoucherList[0].code : null,
    voucherCondition: VoucherList.length ? VoucherList[0].condition : null,
    sellerId: storeProfile.user.id,
    sellerFirstName: storeProfile.user.firstName,
    sellerDisplayName: storeProfile.user.displayName,
    storeCoverImage: storeProfile.coverImage,
    storeDescription: storeProfile.description,
    interestThisEvent: Interest.length !== 0,
    eventList: EventItem.map((item) => {
      const { id, products, price } = item;
      return {
        productId: id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        price,
      };
    }),
    eventOther: otherEvents.map((event) => {
      const { id, startDate, endDate, location, Interest } = event;
      return {
        id,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
        interest: Interest.length !== 0,
      };
    }),
  };

  return newEvent;
};

dataFormat.authEventId = (eventDetails, otherEvents) => {
  const formattedEventDetails = {
    id: eventDetails.id,
    eventName: eventDetails.name,
    eventImage: eventDetails.images,
    eventStartDate: eventDetails.startDate,
    eventEndDate: eventDetails.endDate,
    eventLocation: eventDetails.location,
    voucherCode: eventDetails.VoucherList.length
      ? eventDetails.VoucherList[0].code
      : null,
    voucherCondition: eventDetails.VoucherList.length
      ? eventDetails.VoucherList[0].condition
      : null,
    sellerId: eventDetails.storeProfile.user.id,
    sellerFirstName: eventDetails.storeProfile.user.firstName,
    sellerDisplayName: eventDetails.storeProfile.user.displayName,
    storeCoverImage: eventDetails.storeProfile.coverImage,
    storeDescription: eventDetails.storeProfile.description,
    interestThisEvent: false,
    eventList: eventDetails.EventItem.map((item) => ({
      productId: item.id,
      productName: item.products.name,
      productImage: item.products.image,
      productDescription: item.products.description,
      price: item.price,
    })),
    eventOther: otherEvents.map((event) => ({
      id: event.id,
      eventStartDate: event.startDate,
      eventEndDate: event.endDate,
      eventLocation: event.location,
      interest: false,
    })),
  };

  return formattedEventDetails;
};

module.exports = dataFormat;
