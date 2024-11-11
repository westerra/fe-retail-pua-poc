export const addOneMonthToDate = (skipWeekends: boolean, date: Date = new Date()) => {
  const futureDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0);
  if (!skipWeekends) {
    return futureDate;
  }
  return getEarliestWeekDay(futureDate);
};

export const getFormattedDateString = (date: Date) => {
  const month = date.toLocaleString('en-us', { month: 'short' });
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getEarliestWeekDay = (date: Date = new Date()): Date => {
  if (date.getDay() !== 0 && date.getDay() !== 6) {
    return date;
  }
  return getEarliestWeekDay(new Date(date.setDate(date.getDate() + 1)));
};
