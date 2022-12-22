import { toggleElHtml } from "./utils.js";

let { getTimer } = await import("./timer.js");
let { getDate } = await import("./date.js");
import { handleCalcDates } from "./date.js";

export const switcher = (event, arr) => {
  if (!event.target.classList.contains("control")) {
    return;
  }

  arr.forEach((element) => {
    if (event.target.dataset.type === element.id) {
      toggleElHtml(element);
    }
  });
};
