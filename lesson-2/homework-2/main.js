import { switcher } from "./src/switcher.js";
import { handleCalcDates } from "./src/date.js";
import { getTimer } from "./src/timer2.js";
import {Howl} from "howler";
import music from './assets/audio/tuturu.mp3'

// Выборка html элементов
const controlBlock = document.getElementById("controlblock");
const timerDateCalcForm = document.getElementById("timerdatecalc");
const dateCalcForm = document.getElementById("datecalc");
const dateTimerCalcResult = document.getElementById("datetimer__result");
const dateCalcResult = document.getElementById("datecalc__result");

// Экспорт элементов для switcher
export const elements = [dateCalcForm, timerDateCalcForm];

const sound = new Howl({
  src: music,
});

controlBlock.addEventListener("click", (event) => switcher(event, elements));

dateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sound.play();
  handleCalcDates(event);

  dateCalcResult.innerHTML = event.value;
});

timerDateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getTimer(event);
  dateTimerCalcResult.innerHTML = event.value;
});
