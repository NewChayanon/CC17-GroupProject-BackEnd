const cron = require("node-cron");
const eventServices = require("../services/event-services");
const inboxMessageUserService = require("../services/inboxMessageUser-service");

cron.schedule("0 0 * * *", async () => {
  try {
    const thaiTimeOffset = 7 * 60 * 60 * 1000;
    const today = new Date(Date.now() + thaiTimeOffset);
    const dateToday = new Date(today.toISOString().split("T")[0]);

    const updateEventsToday = await eventServices.findManyEventsByDateAndIsActiveIsFalse(dateToday);
    const eventIds = updateEventsToday.map((event) => event.id);

    if (eventIds.length > 0) {
      await eventServices.updateManyIsActiveIsTrueInId(eventIds);
    }

    const allEventIsActive = await eventServices.findManyEventIdAndByDateAndIsActiveIsTrue(dateToday);

    for (const el of allEventIsActive) {
      const senderId = el.storeProfile.userId;
      const userInterestIds = el.Interest.map((interest) => interest.userId);
      const userFollowIds = el.storeProfile.Follow.map((follow) => follow.userId);
      const userVoucherItemIds = el.VoucherList.flatMap((voucher) => voucher.VoucherItem.map((item) => item.userId));
      const userIds = [...new Set([...userInterestIds, ...userFollowIds, ...userVoucherItemIds])];

      const messages = userIds.map((userId) => ({
        userIdSender: senderId,
        userIdReceiver: userId,
        topic: `Event ${el.id} Notification`,
        message: `Hi Natcha16! The event of your interest and the store "Durian Lovelove" that you followed: "Durian 7.7. Super Promo" will take place tomorrow on 14 July 2024 at K-Village Rama IV from 10:00 - 18:00. See you soon! :) Durian Lovelove`,
      }));

      if (messages.length > 0) {
        await inboxMessageUserService.createManyMessageByData(messages);
      }
    }
  } catch (err) {
    console.error("Error updating events:", err);
  }
});

module.exports = cron;
