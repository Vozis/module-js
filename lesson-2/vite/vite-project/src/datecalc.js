import { DateTime } from "luxon";

export function checkDates(firstDate, secondDate) {
  let minDate = DateTime.fromISO(firstDate);
  let maxDate = DateTime.fromISO(secondDate);
  if (minDate > maxDate) [minDate, maxDate] = [maxDate, minDate];

  return { minDate, maxDate };
}

export function diffDates(firstDate, secondDate) {
  const diff = secondDate.diff(firstDate, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ]);

  return diff;
}

export const diffToHtml = (diff) => {
  diff.toObject();
  return ` 
    <span> 
        ${diff.years ? "Лет: " + diff.years : ""}
        ${diff.months ? "Месяцев: " + diff.months : ""} 
        ${diff.days ? "Дней: " + diff.days : ""} 
        ${diff.hours ? "Часов: " + diff.hours : ""} 
        ${diff.minutes ? "Минут: " + diff.minutes : ""} 
        ${diff.seconds ? "Секунд: " + Math.round(diff.seconds) : ""} 
    </span> 
`;
};
