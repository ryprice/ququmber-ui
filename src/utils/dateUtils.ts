export const weeksInMonth = (month: number, year: number): number => {
  // month_number is in the range 1..12
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const used = firstOfMonth.getUTCDay() + lastOfMonth.getUTCDate();

  return Math.ceil( used / 7);
};

export const daysInMonth = (month: number, year: number): number =>
  new Date(year, month + 1, 0).getDate();

export const monthStartDay = (month: number, year: number): number => {
  const firstOfMonth = new Date();
  firstOfMonth.setFullYear(year, month, 1);
  return firstOfMonth.getDay();
};

export const formatShortDate = (date: Date) => {
  return date && `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
};

export const formatShortDateTime = (time: Date) => (
  `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} ` +
  `${time.getHours()}:${time.getMinutes()}`
);

export const formatRelativeTime = (date: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (timeDifference < minute) {
    return 'just now';
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else {
    return formatShortDate(date);
  }
};
