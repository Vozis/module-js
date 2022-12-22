import { switcher } from "./switcher.js";
import { handleCalcDates } from "./date.js";
import { getTimer } from "./timer2.js";
// import Howler from "./howler.js/src/howler.core.js";

// Выборка html элементов
const controlBlock = document.getElementById("controlblock");
const timerDateCalcForm = document.getElementById("timerdatecalc");
const dateCalcForm = document.getElementById("datecalc");
const dateTimerCalcResult = document.getElementById("datetimer__result");
const dateCalcResult = document.getElementById("datecalc__result");

// Экспорт элементов для switcher
export const elements = [dateCalcForm, timerDateCalcForm];

// const sound = new Howl({
//   src: "sound.webm",
// });

controlBlock.addEventListener("click", (event) => switcher(event, elements));

dateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // sound.play();
  handleCalcDates(event);
  // console.log(event.value);
  dateCalcResult.innerHTML = event.value;
});

timerDateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getTimer(event, dateTimerCalcResult);
  // dateTimerCalcResult.innerHTML = event.value;
});
