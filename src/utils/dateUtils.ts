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