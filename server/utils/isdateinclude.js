const isDateInclude = ({ startDate, endDate, checkDate }) => {
  const formatCheckDate = new Date(checkDate);
  if (!endDate) {
    return formatCheckDate.valueOf() == startDate.valueOf();
  } else {
    return startDate <= formatCheckDate && endDate >= formatCheckDate;
  }
};

module.exports = {
  isDateInclude,
};
