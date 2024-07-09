exports.eventWithinToday = (event, dateNow) => {
  const { startDate, endDate } = event;
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  const formattedDateNow = dateNow.toISOString().split("T")[0];

  return (
    formattedStartDate <= formattedDateNow &&
    formattedDateNow <= formattedEndDate
  );
};
