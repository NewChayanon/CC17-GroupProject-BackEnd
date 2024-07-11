const cron = require("node-cron");
const eventServices = require("../services/event-services");
const inboxMessageUserService = require("../services/inboxMessageUser-service");

cron.schedule("* * * * *", async () => {
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

    for (let el of allEventIsActive) {
      const senderId = el.storeProfile.userId;
      const userInterestId = el.Interest.map((el) => el.userId);
      const userFollowId = el.storeProfile.Follow.map((el) => el.userId);
      const userVoucherItemId = el.VoucherList.flatMap((el) => el.VoucherItem.map((item) => item.userId));
      const userId = [...new Set([...userInterestId, ...userFollowId, ...userVoucherItemId])];

      const data = userId.map((element) => ({
        userIdSender: senderId,
        userIdReceiver: element,
        topic: `event ${el.id} notification`,
        message: `Hi Natcha16! The event of your interest and the store "Durian Lovelove" that you followed : "Durian 7.7. Super Promo" will be taken place tomorrow on 14 July 2024 at K-Village Rama IV from 10:00 - 18:00. See you soon! :)
      Durian Lovelove`,
      }));
      await inboxMessageUserService.createManyMessageByData(data);
    }
  } catch (err) {
    console.error("Error updating events:", err);
  }
});

module.exports = cron;
