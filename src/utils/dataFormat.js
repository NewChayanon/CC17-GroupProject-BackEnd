const { eventWithinToday, eventUpcoming } = require("./searchByDate");

const dataFormat = {};

dataFormat.searchBar = (dataSearchBy) => {
  const newFormat = dataSearchBy.map((el) => {
    const countVoucherThisEvent = el.VoucherList.length === 0 ? 0 : el.VoucherList[0].VoucherItem.length;
    return {
      id: el.id,
      eventName: el.name,
      eventImage: el.images,
      eventStartDate: el.startDate,
      eventEndDate: el.endDate,
      eventLocation: el.location,
      eventLocationName: el.locationName,
      eventDescription: el.description,

      storeId: el.storeProfile.id,
      storeName: el.storeProfile.name,
      storeCoverImage: el.storeProfile.coverImage,
      storeDescription: el.storeProfile.description,

      sellerId: el.storeProfile.user.id,
      sellerFirstName: el.storeProfile.user.firstName,
      sellerCoverImage: el.storeProfile.user.profileImage,
      countFollower: el.storeProfile.Follow.length,
      countEventOfSeller: el.storeProfile.Events.length,
      countVoucherThisEvent,
      sumVoucherSeller: el.storeProfile.VoucherItem.length,
    };
  });
  return newFormat;
};

dataFormat.sellerNearMe = (oldData, groupVoucherItem, groupEvent) => {
  const newFormat = oldData.map((el) => {
    const countEventOfSeller = groupEvent.find((element) => element.storeProfileId === el.storeProfileId)._count.storeProfileId;

    const sumVoucherSeller = groupVoucherItem.find((element) => element.storeProfileId === el.storeProfileId)._count.storeProfileId;

    const countVoucherThisEvent = el.VoucherList.length === 0 ? 0 : el.VoucherList[0].VoucherItem.length;

    return {
      id: el.id,
      eventName: el.name,
      eventImage: el.images,
      eventStartDate: el.startDate,
      eventEndDate: el.endDate,
      eventLocation: el.location,
      eventLocationName: el.locationName,
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

dataFormat.selectStoreProfileId = (seller) => seller.map((el) => el.storeProfileId);

dataFormat.allFavoriteList = (allFavorite, allStoreProfileIdInFavorite) => {
  const allFavoriteList = allFavorite.map((el) => ({
    followId: el.id,
  }));

  const updatedFavoriteList = allStoreProfileIdInFavorite.map((el, index) => ({
    ...allFavoriteList[index],
    storeProfileId: el.id,
    storeImage: el.coverImage,
    storeName: el.name,
    followers: el.Follow.length,
    events: el.Events.length,
    vouchers: el.VoucherItem.length,
    sellerCoverImage: el.user.profileImage,
  }));

  return updatedFavoriteList;
};

dataFormat.userEventId = (event, otherEvents, userId) => {
  const { id, name, images, startDate, endDate, location, locationName, description, VoucherList, storeProfile, Interest, EventItem } = event;
  const userVoucherStatus = VoucherList[0]?.VoucherItem.find((el) => el.userId === userId);
  const newEvent = {
    id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    eventLocation: location,
    eventLocationName: locationName,
    eventDescription: description,
    voucherItem: VoucherList.length
      ? {
          voucherCode: VoucherList[0].code,
          voucherDescription: VoucherList[0].description,
          voucherCondition: VoucherList[0].condition,
          voucherRemainingAmount: VoucherList[0].totalAmount - VoucherList[0].VoucherItem.length,
          userVoucherStatus: userVoucherStatus ? userVoucherStatus.status : [],
        }
      : [],
    sellerId: storeProfile.user.id,
    sellerFirstName: storeProfile.user.firstName,
    sellerDisplayName: storeProfile.user.displayName,
    storeCoverImage: storeProfile.coverImage,
    storeDescription: storeProfile.description,
    interest: Interest.length !== 0,
    eventList: EventItem.map((item) => {
      const { id, products } = item;
      return {
        productId: id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        price: products.price,
        unit: products.unit,
      };
    }),
    // statusCoupon,
    eventOther: otherEvents.map((event) => {
      const { id, startDate, endDate, location, locationName, Interest } = event;
      return {
        id,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
        eventLocationName: locationName,
        interest: Interest.length !== 0,
      };
    }),
  };

  return newEvent;
};

dataFormat.authEventId = (eventDetails, otherEvents) => {
  const { id, name, images, startDate, endDate, location, locationName, description, VoucherList, storeProfile, Interest, EventItem } = eventDetails;
  const formattedEventDetails = {
    id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    eventLocation: location,
    eventLocationName: locationName,
    eventDescription: description,
    voucherItem: VoucherList.length
      ? {
          voucherCode: VoucherList[0].code,
          voucherDescription: VoucherList[0].description,
          voucherCondition: VoucherList[0].condition,
          voucherRemainingAmount: VoucherList[0].totalAmount - VoucherList[0].VoucherItem.length,
          userVoucherStatus: [],
        }
      : [],
    sellerId: storeProfile.user.id,
    sellerFirstName: storeProfile.user.firstName,
    sellerDisplayName: storeProfile.user.displayName,
    storeCoverImage: storeProfile.coverImage,
    storeDescription: storeProfile.description,
    interest: false,
    eventList: EventItem.map((item) => {
      const { id, products } = item;
      return {
        productId: id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        price: products.price,
        unit: products.unit,
      };
    }),

    eventOther: otherEvents.map((event) => {
      const { id, startDate, endDate, location, locationName, Interest } = event;
      return {
        id: id,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
        eventLocationName: locationName,
        interest: false,
      };
    }),
  };

  return formattedEventDetails;
};

dataFormat.authStoreProfileId = (oldData) => {
  const { id, coverImage, user, name, Follow, Events, VoucherItem, sellerDescription, description, Comment } = oldData;

  return {
    id,
    storeCoverImage: coverImage,
    sellerCoverImage: user.profileImage,
    sellerFirstName: user.firstName,
    sellerLastName: user.lastName,
    storeName: name,
    storeFollowers: Follow.length,
    storeEvents: Events.length,
    storeVouchers: VoucherItem.length,
    followed: false,
    sellerDescription,
    storeDescription: description,
    review: Comment.map(({ user, userId, storeProfileId, ...rest }) => ({
      ...rest,
      commenterFirstName: user.firstName,
      commenterLastName: user.lastName,
    })),
  };
};

dataFormat.userStoreProfileId = (oldData, userId) => {
  const { id, coverImage, user, name, Follow, Events, VoucherItem, sellerDescription, description, Comment } = oldData;

  return {
    id,
    storeCoverImage: coverImage,
    sellerCoverImage: user.profileImage,
    sellerFirstName: user.firstName,
    sellerLastName: user.lastName,
    storeName: name,
    storeFollowers: Follow.length,
    storeEvents: Events.length,
    storeVouchers: VoucherItem.length,
    followed: Follow.find((el) => el.userId === userId) ? true : false,
    sellerDescription,
    storeDescription: description,
    review: Comment.map(({ user, userId, storeProfileId, ...rest }) => ({
      ...rest,
      commenterFirstName: user.firstName,
      commenterLastName: user.lastName,
    })),
  };
};

dataFormat.couponList = (allCoupon) =>
  allCoupon.map(
    ({
      id,
      status: userVoucherStatus,
      storeProfile: { name: storeName },
      voucherList: {
        condition: voucherCondition,
        code: voucherCode,
        event: { name: eventName, startDate: eventStartDate, endDate: eventEndDate },
      },
    }) => ({
      voucherItemId: id,
      storeName,
      eventName,
      voucherCondition,
      eventStartDate,
      eventEndDate,
      voucherCode,
      userVoucherStatus,
    })
  );

dataFormat.StoreMainPage = (storeProfile, countFollower, countVoucher) => {
  const { id, coverImage, name: storeName, Events, user, facebook = [], instagram = [], line = [] } = storeProfile;
  const { profileImage, firstName, lastName } = user;
  const events = Events.length;
  const myEvent = Events.map(({ id, name, images, startDate, endDate, locationName, location }) => ({
    eventId: id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    storeName,
    locationName,
    location,
  }));

  let eventNow = [];
  let upComingEvent = [];

  if (Events) {
    const thaiTimeOffset = 7 * 60 * 60 * 1000;
    const today = new Date(Date.now() + thaiTimeOffset);
    const dateToday = new Date(today.toISOString().split("T")[0]);

    eventNow = Events.filter((event) => eventWithinToday(event, dateToday)).map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
      eventId: id,
      eventName: name,
      startDate,
      endDate,
      openTime,
      closingTime,
      locationName,
    }));

    upComingEvent = Events.filter((event) => eventUpcoming(event, dateToday)).map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
      eventId: id,
      eventName: name,
      startDate,
      endDate,
      openTime,
      closingTime,
      locationName,
    }));
  }

  return {
    myEvent,
    myStoreProfile: {
      storeProfileId: id,
      storeProfileImage: coverImage,
      userCoverImage: profileImage,
      firstName,
      lastName,
      storeName,
      followers: countFollower.length !== 0 ? countFollower[0]._count.storeProfileId : 0,
      events,
      vouchers: countVoucher.length !== 0 ? countVoucher[0]._count.storeProfileId : 0,
      facebook,
      instagram,
      line,
      eventNow,
      upComingEvent,
    },
  };
};

dataFormat.eventInterest = (data, userId) => {
  return data.map((el) => {
    const { event } = el;
    const { storeProfile, VoucherList, id, name, images, startDate, endDate, openTime, locationName } = event;
    const { user, name: storeProfileName, id: sellerId } = storeProfile;
    const { firstName: sellerFirstName, profileImage: sellerCoverImage } = user;

    let getVoucher = [];
    if (VoucherList[0]) {
      const voucherItem = VoucherList[0].VoucherItem.find((item) => item.userId === userId);
      if (voucherItem) {
        getVoucher = voucherItem.status;
      }
      if (!voucherItem) {
        getVoucher = "UN-COLLECTED";
      }
    }

    return {
      storeProfileName,
      interestId: el.id,
      eventId: id,
      eventName: name,
      eventImage: images,
      eventStartDate: startDate,
      eventEndDate: endDate,
      openTime,
      locationName,
      sellerId,
      sellerFirstName,
      sellerCoverImage,
      getVoucher,
    };
  });
};

dataFormat.detailYellowCard = (event) => {
  const {
    id: eventId,
    name: eventName,
    storeProfile,
    startDate: eventStartDate,
    endDate: eventEndDate,
    openTime,
    closingTime,
    locationName: eventLocationName,
    location: eventLocation,
    description: eventDescription,
    images: eventImage,
    VoucherList,
    EventItem = [],
  } = event;
  const { name: storeProfileName } = storeProfile;

  const haveVoucher = VoucherList.length !== 0;
  const promotion = haveVoucher
    ? [
        {
          description: VoucherList[0].description,
          condition: VoucherList[0].condition,
          image: VoucherList[0].image,
          code: VoucherList[0].code,
          voucherListDiscount: VoucherList[0].discount,
        },
      ]
    : [];

  const voucherListDiscount = promotion.length > 0 ? promotion[0].voucherListDiscount : [];

  const product = EventItem.map(({ products: { id: productId, image: productImage, name: productName, description: productDescription, price: productPrice, unit: productUnit } }) => {
    return {
      productId,
      productImage,
      productName,
      productDescription,
      productPrice,
      productUnit,
      voucherListDiscount,
    };
  });
  return {
    eventId,
    eventName,
    storeProfileName,
    eventStartDate,
    eventEndDate,
    openTime,
    closingTime,
    eventLocationName,
    eventLocation,
    eventDescription,
    eventImage,
    promotion,
    product,
  };
};

dataFormat.myProduct = (product) =>
  product.map(({ id, image, name, description, price, unit }) => {
    return {
      productId: id,
      productImage: image,
      productName: name,
      productDescription: description,
      productPrice: price,
      productUnit: unit,
    };
  });

dataFormat.addProduct = ({ products }) => {
  return {
    productId: products.id,
    productImage: products.image,
    productName: products.name,
    productDescription: products.description,
    productPrice: products.price,
    productUnit: products.unit,
  };
};

dataFormat.myEvent = (myEvent) =>
  myEvent.map(({ id, name, storeProfile, startDate, endDate, openTime, closingTime, locationName, location }) => {
    return {
      eventId: id,
      eventName: name,
      storeProfileName: storeProfile.name,
      eventStartDate: startDate,
      eventEndDate: endDate,
      openTime,
      closingTime,
      locationName,
      location,
    };
  });

dataFormat.storeReview = (allReview) =>
  allReview.map(({ id, topic, rate, comment, user, createdAt, isVerify }) => ({
    commentId: id,
    topic,
    rate,
    comment,
    commenterFirstName: user.firstName,
    commenterLastName: user.lastName,
    createdAt,
    isVerify,
  }));

dataFormat.sellerCoupon = (allCoupon) =>
  allCoupon.map(
    ({
      id: voucherItemId,
      event: {
        name: eventName,
        startDate: eventStartDate,
        endDate: eventEndDate,
        storeProfile: { name: storeName },
      },
      description: voucherDescription,
      condition: voucherCondition,
      code: voucherCode,
      image: voucherImage,
    }) => ({
      voucherItemId,
      storeName,
      eventName,
      voucherCondition,
      voucherDescription,
      eventStartDate,
      eventEndDate,
      voucherCode,
      voucherImage,
    })
  );

dataFormat.myFollower = (myFollower) =>
  myFollower.map(({ user }) => ({
    userId: user.id,
    userProfileImage: user.profileImage,
    userDisplayName: user.displayName,
    userFirstName: user.firstName,
    userLastName: user.lastName,
  }));

dataFormat.myFollowerId = ({ user }) => {
  const { id: userId, profileImage, displayName, firstName, lastName, createdAt, StoreProfile } = user;

  const storeProfile = [];
  if (StoreProfile) {
    const { id: storeProfileId, coverImage, name, Follow, Events, VoucherItem, facebook, instagram, line } = StoreProfile;

    const followers = Follow ? Follow.length : 0;
    const events = Events ? Events.length : 0;
    const vouchers = VoucherItem ? VoucherItem.length : 0;

    let eventNow = [];
    let upComingEvent = [];

    if (Events) {
      const thaiTimeOffset = 7 * 60 * 60 * 1000;
      const today = new Date(Date.now() + thaiTimeOffset);
      const dateToday = new Date(today.toISOString().split("T")[0]);

      eventNow = Events.filter((event) => eventWithinToday(event, dateToday)).map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
        eventId: id,
        eventName: name,
        startDate,
        endDate,
        openTime,
        closingTime,
        locationName,
      }));

      upComingEvent = Events.filter((event) => eventUpcoming(event, dateToday)).map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
        eventId: id,
        eventName: name,
        startDate,
        endDate,
        openTime,
        closingTime,
        locationName,
      }));
    }

    storeProfile.push({
      storeProfileId,
      storeProfileCoverImage: coverImage,
      userProfileImage: profileImage,
      userDisplayName: displayName,
      userFirstName: firstName,
      userLastName: lastName,
      storeName: name,
      followers,
      events,
      vouchers,
      facebook,
      instagram,
      line,
      eventNow,
      upComingEvent,
    });
  }

  return {
    userId,
    userProfileImage: profileImage,
    userDisplayName: displayName,
    userFirstName: firstName,
    userLastName: lastName,
    userCreatedAt: createdAt,
    storeProfile,
  };
};

dataFormat.myStoreProfile = ([mySeller, myStoreProfile, myFollower, myEvent, myVoucherItem, myProduct]) => {
  let followers = myFollower.length;
  let events = myEvent.length;
  let vouchers = myVoucherItem.length;
  let product = [];
  if (myProduct.length !== 0) {
    product = myProduct.map((el) => ({
      productId: el.id,
      productImage: el.image,
      productName: el.name,
      productDescription: el.description,
      productPrice: el.price,
      productUnit: el.unit,
    }));
  }

  let eventNow = [];
  let upComingEvent = [];

  if (myEvent) {
    const thaiTimeOffset = 7 * 60 * 60 * 1000;
    const today = new Date(Date.now() + thaiTimeOffset);
    const dateToday = new Date(today.toISOString().split("T")[0]);

    eventNow = myEvent
      .filter((event) => eventWithinToday(event, dateToday))
      .map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
        eventId: id,
        eventName: name,
        startDate,
        endDate,
        openTime,
        closingTime,
        locationName,
      }));

    upComingEvent = myEvent
      .filter((event) => eventUpcoming(event, dateToday))
      .map(({ id, name, startDate, endDate, openTime, closingTime, locationName }) => ({
        eventId: id,
        eventName: name,
        startDate,
        endDate,
        openTime,
        closingTime,
        locationName,
      }));
  }

  return {
    storeProfileId: myStoreProfile.id,
    storeProfileImage: myStoreProfile.coverImage,
    userProfileImage: mySeller.profileImage,
    storeProfileName: myStoreProfile.name,
    followers,
    events,
    vouchers,
    facebook: myStoreProfile.facebook,
    instagram: myStoreProfile.instagram,
    line: myStoreProfile.line,
    storeProfileSellerDescription: myStoreProfile.sellerDescription,
    storeProfileDescription: myStoreProfile.description,
    product,
    eventNow,
    upComingEvent,
  };
};

module.exports = dataFormat;
