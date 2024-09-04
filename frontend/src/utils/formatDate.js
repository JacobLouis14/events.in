// localize date
export const localiseDate = (dateDate) => {
  const dateObject = new Date(dateDate);
  const formatedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return formatedDate;
};

// seperating dates between two date
export const seperateDates = (startDate, endDate) => {
  let dates = [];
  let cD = new Date(startDate);
  let eD = new Date(endDate);

  while (cD <= eD) {
    dates.push(cD.toISOString());
    cD.setDate(cD.getDate() + 1);
  }
  return dates;
};

// checking valid date and time to book
export const isValidToBook = (starttime, selectedDate) => {
  const currentDate = new Date();
  const sDate = new Date(selectedDate);
  const [hours, minutes] = starttime.split(":").map(Number);
  const formatedSelectedDate = new Date(
    sDate.getUTCFullYear(),
    sDate.getUTCMonth(),
    sDate.getUTCDate(),
    hours,
    minutes
  );
  return currentDate < formatedSelectedDate;
};

// getting current time
export const getCurrentTIme = () => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  return currentTime;
};
