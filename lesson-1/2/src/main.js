import { diffDates, diffToHtml } from "./datecalc.js";
import { switcher } from "./switcher.js";
import { formatError } from "./utils.js";
import { handleCalcDates } from "./date.js";
import { DateTime } from "./luxon.js";

const controlBlock = document.getElementById("controlblock");
const dateCalcForm = document.getElementById("datecalc");
const timerDateCalcForm = document.getElementById("timerdatecalc");
const dateCalcResult = document.getElementById("datecalc__result");
const dateTimerCalcResult = document.getElementById("datetimer__result");

export const elements = [dateCalcForm, timerDateCalcForm];

controlBlock.addEventListener("click", (event) => switcher(event, elements));

dateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleCalcDates(event, dateCalcResult);
});

let timer;
let leftTime;

function createTimer(startDate) {
  console.log("timer start");
  timer = setInterval(() => {
    const firstDate = DateTime.local();
    const secondDate = DateTime.fromISO(startDate);

    const diff = diffDates(firstDate, secondDate);
    leftTime = DateTime.fromJSDate(diff);

    console.log("diff:", diff);

    if (diff.shiftTo("milliseconds") <= 0) {
      dateTimerCalcResult.innerHTML = formatError("Время истекло.");
      console.log("Таймер закончился");
      clearInterval(timer);
    } else {
      dateTimerCalcResult.innerHTML = diffToHtml(diff);
    }
  }, 1000);

  return timer, leftTime;
}

const updateTimer = (startDate) => {
  console.log("timer updated");
  const secondDate = DateTime.fromISO(startDate);
  const endDate = new Date().toISOString();
  const firstDate = DateTime.now();

  console.log(secondDate, endDate, firstDate);

  const diff = diffDates(firstDate, secondDate);
  leftTime = DateTime.fromJSDate(diff);

  if (diff.shiftTo("milliseconds") <= 0) {
    dateTimerCalcResult.innerHTML = formatError("Время истекло.");
    console.log("Таймер закончился");
    clearInterval(timer);
  } else {
    dateTimerCalcResult.innerHTML = diffToHtml(diff);
  }
};

function pauseTimer() {
  console.log("timer paused");
  clearInterval(timer);
}

function resumeTimer(startDate) {
  console.log("timer resume");
  const secondDate = DateTime.fromISO(startDate);
  timer = setInterval(() => {
    const endDate = leftTime;
    const firstDate = DateTime.fromISO(endDate);

    const diff = diffDates(firstDate, secondDate);

    if (diff.shiftTo("milliseconds") <= 0) {
      clearInterval(timer);
      dateTimerCalcResult.innerHTML = formatError("Время истекло.");
      console.log("Таймер закончился");
    } else {
      dateTimerCalcResult.innerHTML = diffToHtml(diff);
    }
  }, 1000);
}

function getDateTimer(event) {
  event.preventDefault();
  dateTimerCalcResult.innerHTML = "";

  // console.log(event.target.elements);

  const [startDateEl, buttonPause, buttonContinue] = event.target.elements;

  // console.log(startDateEl, buttonContinue, buttonPause);

  let startDate = startDateEl.value;

  if (!startDate) {
    dateTimerCalcResult.innerHTML = formatError("Необходимо ввести дату");
  }

  createTimer(startDate);

  // buttonPause.addEventListener("click", () => pauseTimer());

  // buttonContinue.addEventListener("click", resumeTimer);
}

timerDateCalcForm.addEventListener("submit", getDateTimer);
