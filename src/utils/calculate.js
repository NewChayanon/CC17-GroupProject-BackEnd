exports.filterLocationWithinRange = (allEventIsActive, userLocation, range) =>
  allEventIsActive.filter(
    (el) => distanceLocationCal(userLocation, el.location) < range
  );

const distanceLocationCal = (userLocation, eventLocation) => {
  const [lat1, lon1] = userLocation.split(",").map(parseFloat);
  const [lat2, lon2] = eventLocation.split(",").map(parseFloat);

  const earthRadius = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};

// Converts numeric degrees to radians
const toRad = (value) => (value * Math.PI) / 180;
