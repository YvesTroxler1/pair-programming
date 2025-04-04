export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  const year = startDate.getFullYear();

  if (startDate.getFullYear() !== untilDate.getFullYear()) {
    throw new Error("Anstellung muss innerhalb eines Kalenderjahres liegen.");
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const start = new Date(year, startDate.getMonth(), startDate.getDate());
  const end = new Date(year, untilDate.getMonth(), untilDate.getDate());
  const totalDays = Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInYear = isLeap ? 366 : 365;

  const vacation = vacationDays * (totalDays / daysInYear) * percentage;

  return Math.round(vacation * 100) / 100;
}
