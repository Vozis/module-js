import { toggleElHtml } from "./utils.js";

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
