import { DateTime } from "./luxon.js";
import { formatError } from "./utils.js";
import { diffToHtml } from "./datecalc.js";

export function getTimer(event, element) {
  const [inputEl, _, buttonPause, buttonResume] = event.target.elements;
  let firstDate = DateTime.fromISO(inputEl.value);

  let timer;
  let diff;

  if (!firstDate.isValid) {
    console.log("input is invalid");
    element.innerHTML = formatError("Некеорректные исхожные данные.");
    return;
  }

  function newTimer() {
    console.log("timer work");
    element.innerHTML = "";
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
      element.innerHTML = formatError("Таймер истек.");
      clearInterval(timer);
    } else {
      element.innerHTML = diffToHtml(diff);
    }
  }

  newTimer();
  timer = setInterval(newTimer, 1000);

  buttonPause.addEventListener("click", () => clearInterval(timer));
  buttonResume.addEventListener("click", () => {
    clearInterval(timer);
    // console.log("diff", diff);
    const secondDate = DateTime.local();
    firstDate = secondDate.plus(diff);
    // console.log(firstDate);
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
        element.innerHTML = formatError("Таймер истек.");
        clearInterval(timer);
      } else {
        element.innerHTML = diffToHtml(diff);
      }
    }, 1000);
  });
}
