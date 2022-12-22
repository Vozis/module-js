import { DateTime } from "luxon";
import { formatError } from "./utils.js";
import { diffToHtml } from "./datecalc.js";

export function getTimer(event) {
  const [inputEl, _, buttonPause, buttonResume] = event.target.elements;
  let firstDate = DateTime.fromISO(inputEl.value);

  let timer;
  let diff;

  if (!firstDate.isValid) {
    console.log("input is invalid");
    event.value = formatError("Некорректные исходные данные.");
    return;
  }

  function newTimer() {
    console.log("timer work");
    event.value = "";
    const secondDate = DateTime.local();
    diff = firstDate.diff(secondDate, [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ]);

    if (diff.as("milliseconds") <= 0) {
      console.log("timer end");
      event.value = formatError("Таймер истек.");
      clearInterval(timer);
    } else {
      event.value = diffToHtml(diff);
    }
  }

  newTimer();
  timer = setInterval(newTimer, 1000);

  buttonPause.addEventListener("click", () => clearInterval(timer));
  buttonResume.addEventListener("click", () => {
    clearInterval(timer);
    const secondDate = DateTime.local();
    firstDate = secondDate.plus(diff);

    timer = setInterval(() => {
      console.log("timer work");
      const secondDate = DateTime.local();

      diff = firstDate.diff(secondDate, [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
      ]);

      if (diff.as("milliseconds") <= 0) {
        console.log("timer end");
        event.value = formatError("Таймер истек.");
        clearInterval(timer);
      } else {
        event.value = diffToHtml(diff);
      }
    }, 1000);
  });
}
