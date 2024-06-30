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

dataFormat.storeProfileId = (oldData) => {
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

module.exports = dataFormat;
