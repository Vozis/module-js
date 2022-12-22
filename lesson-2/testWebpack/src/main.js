import { handleCalcDates } from "./date.js";
import '../style.scss';

const dateCalcForm = document.getElementById("datecalc");

const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleCalcDates(event, dateCalcResult);
});

