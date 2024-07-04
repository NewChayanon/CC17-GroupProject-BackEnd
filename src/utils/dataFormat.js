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

dataFormat.userEventId = (event, otherEvents, userId) => {
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
  const userVoucherStatus = VoucherList[0]?.VoucherItem.find(
    (el) => el.userId === userId
  );
  const newEvent = {
    id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    eventLocation: location,
    voucherItem: VoucherList.length
      ? {
          voucherCode: VoucherList[0].code,
          voucherCondition: VoucherList[0].condition,
          voucherRemainingAmount:
            VoucherList[0].totalAmount - VoucherList[0].VoucherItem.length,
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
      const { id, products, price } = item;
      return {
        productId: id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        price,
      };
    }),
    // statusCoupon,
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
  } = eventDetails;
  const formattedEventDetails = {
    id,
    eventName: name,
    eventImage: images,
    eventStartDate: startDate,
    eventEndDate: endDate,
    eventLocation: location,
    voucherItem: VoucherList.length
      ? {
          voucherCode: VoucherList[0].code,
          voucherCondition: VoucherList[0].condition,
          voucherRemainingAmount:
            VoucherList[0].totalAmount - VoucherList[0].VoucherItem.length,
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
      const { id, products, price } = item;
      return {
        productId: id,
        productName: products.name,
        productImage: products.image,
        productDescription: products.description,
        price: price,
      };
    }),

    eventOther: otherEvents.map((event) => {
      const { id, startDate, endDate, location, Interest } = event;
      return {
        id: id,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
        interest: false,
      };
    }),
  };

  return formattedEventDetails;
};

dataFormat.authStoreProfileId = (oldData) => {
  const {
    id,
    coverImage,
    user,
    name,
    Follow,
    Events,
    VoucherItem,
    sellerDescription,
    description,
    Comment,
  } = oldData;

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
  const {
    id,
    coverImage,
    user,
    name,
    Follow,
    Events,
    VoucherItem,
    sellerDescription,
    description,
    Comment,
  } = oldData;

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
        event: {
          name: eventName,
          startDate: eventStartDate,
          endDate: eventEndDate,
        },
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
  const { id, coverImage, name: storeName, Events, user } = storeProfile;
  const { profileImage, firstName, lastName } = user;
  const events = Events?.length;
  const myEvent = Events.map(
    ({ id, images, startDate, endDate, locationName, location }) => ({
      eventId: id,
      eventImage: images,
      eventStartDate: startDate,
      eventEndDate: endDate,
      storeName,
      locationName,
      location,
    })
  );

  const { eventNow, upComingEvent } = Events.reduce(
    (
      acc,
      { id, name, startDate, endDate, openTime, locationName, isActive }
    ) => {
      const eventDetails = {
        eventId: id,
        startDate,
        endDate,
        openTime,
        locationName,
        eventName: name,
      };
      if (isActive) {
        acc.eventNow.push(eventDetails);
      }
      if (!isActive) {
        acc.upComingEvent.push(eventDetails);
      }
      return acc;
    },
    { eventNow: [], upComingEvent: [] }
  );

  return {
    myEvent,
    myStoreProfile: {
      storeProfileId: id,
      storeProfileImage: coverImage,
      userCoverImage: profileImage,
      firstName,
      lastName,
      storeName,
      followers:
        countFollower.length !== 0 ? countFollower[0]._count.storeProfileId : 0,
      events,
      vouchers:
        countVoucher.length !== 0 ? countVoucher[0]._count.storeProfileId : 0,
      eventNow,
      upComingEvent,
    },
  };
};

dataFormat.eventInterest = (data, userId) => {
  return data.map((el) => {
    const { event } = el;
    const {
      storeProfile,
      VoucherList,
      id,
      name,
      images,
      startDate,
      endDate,
      openTime,
      locationName,
    } = event;
    const { user, name: storeProfileName, id: sellerId } = storeProfile;
    const { firstName: sellerFirstName, profileImage: sellerCoverImage } = user;

    let getVoucher = [];
    if (VoucherList[0]) {
      const voucherItem = VoucherList[0].VoucherItem.find(
        (item) => item.userId === userId
      );
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

module.exports = dataFormat;
