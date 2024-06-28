const distanceLocationCal = (userLocation, eventLocation) => {
  let lat1 = userLocation.split(",")[0]
  let lon1 = userLocation.split(",")[1]
  let lat2 = eventLocation.split(",")[0]
  let lon2 = eventLocation.split(",")[1]

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  const earthRadius = 6371; // km
  dLat = toRad(lat2 - lat1);
  dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = earthRadius * c;
  return distance;
};
// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

module.exports = distanceLocationCal;
