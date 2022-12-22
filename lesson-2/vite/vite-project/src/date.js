import { checkDates, diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";

export function handleCalcDates(event) {
  let { firstDate, secondDate } = event.target.elements;
  (firstDate = firstDate.value), (secondDate = secondDate.value);

  if (firstDate && secondDate) {
    const { maxDate, minDate } = checkDates(firstDate, secondDate);
    const diff = diffDates(minDate, maxDate);
    event.value = diffToHtml(diff);
  } else
    event.value = formatError(
      "Для расчета промежутка необходимо заполнить оба поля",
    );
}
