import { chekDates, diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";

export function handleCalcDates(event, result) {
  result.innerHTML = "";

  console.log(event.target.elements);
  let { firstDate, secondDate } = event.target.elements;
  console.log(firstDate, secondDate);
  (firstDate = firstDate.value), (secondDate = secondDate.value);

  if (firstDate && secondDate) {
    const { maxDate, minDate } = chekDates(firstDate, secondDate);
    const diff = diffDates(minDate, maxDate);
    result.innerHTML = diffToHtml(diff);
    return result;
  } else
    result.innerHTML = formatError(
      "Для расчета промежутка необходимо заполнить оба поля",
    );
  return result;
}
