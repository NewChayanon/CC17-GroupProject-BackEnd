const distanceLocationCal = require("../utils/distanceLocation");

const refactorService = {};


refactorService.filterLocationWithinRange = (
  allEventIsActive,
  userLocation,
  range
) =>
  allEventIsActive.filter(
    (el) => distanceLocationCal(userLocation, el.location) < range
  );

module.exports = refactorService;
