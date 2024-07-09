exports.eventWithinToday = (event, dateNow) => {
  const { startDate, endDate } = event;
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  const formattedDateNow = dateNow.toISOString().split("T")[0];

  return formattedStartDate <= formattedDateNow && formattedDateNow <= formattedEndDate;
};

exports.eventWithinTomorrow = (event, dateNow) => {
  const { startDate, endDate } = event;
  const tomorrow = new Date(dateNow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  const formattedDateTomorrow = tomorrow.toISOString().split("T")[0];
  return formattedStartDate <= formattedDateTomorrow && formattedEndDate >= formattedDateTomorrow;
};

exports.eventWithinRange = (event, dateNow, dateRange) => {
  const { startDate, endDate } = event;
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  const formattedDateNow = dateNow.toISOString().split("T")[0];
  const formattedDateRange = dateRange.toISOString().split("T")[0];
  // console.log(formattedStartDate,"",formattedDateNow,"",formattedEndDate,"",formattedDateRange,formattedStartDate <= formattedDateRange && formattedEndDate >= formattedDateNow)

  return formattedStartDate <= formattedDateRange && formattedDateNow <= formattedEndDate;
};
