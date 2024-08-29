// localize date
export const localiseDate = (dateDate) => {
  const dateObject = new Date(dateDate);
  const formatedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatedDate;
};

// seperating dates between two date
export const seperateDates = (startDate, endDate) => {
  let dates = [];
  let cD = new Date(startDate);
  let eD = new Date(endDate);

  while (cD <= eD) {
    dates.push(localiseDate(cD));
    cD.setDate(cD.getDate() + 1);
  }
  return dates;
};
