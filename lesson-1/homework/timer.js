import { DateTime, Interval } from "./luxon.js";
import { formatError } from "./utils.js";
import { diffToHtml } from "./datecalc.js";

let timer;
let leftTime;

export function createTimer(firstDate) {
  console.log("timer start");
  clearInterval(timer);
  timer = setInterval(() => {
    dateTimerCalcResult.innerHTML = "";
    const secondDate = DateTime.local();
    // console.log("secondDate: ", secondDate);

    const diff = firstDate.diff(secondDate, [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ]);
    console.log("diff", diff.toObject());
    leftTime = secondDate.plus(diff);
    console.log("leftTime: ", leftTime);

    if (diff.as("milliseconds") <= 0) {
      console.log("timer end");
      dateTimerCalcResult.innerHTML = formatError("Таймер истек.");
      clearInterval(timer);
    } else {
      dateTimerCalcResult.innerHTML = diffToHtml(diff);
    }
  }, 1000);
}

export function pauseTimer(timer) {
  console.log("timer paused");
  clearInterval(timer);
}

export function updateTimer() {
  clearInterval(timer);
  createTimer(leftTime);
}
