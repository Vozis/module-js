import { DateTime } from "./luxon.js";
import { switcher } from "./switcher.js";
import { formatError } from "./utils.js";
import { pauseTimer, updateTimer } from "./timer.js";
import { diffToHtml } from "./datecalc.js";
import { handleCalcDates } from "./date.js";

// Выборка html элементов
const controlBlock = document.getElementById("controlblock");
const timerDateCalcForm = document.getElementById("timerdatecalc");
const dateCalcForm = document.getElementById("datecalc");
const dateTimerCalcResult = document.getElementById("datetimer__result");
const dateCalcResult = document.getElementById("datecalc__result");

// Экспорт элементов для switcher
// хотел как-то сделать еще так, чтобы в main вообще импортировать
// только switcher, а уже из него бы грущился js файлы именно нужные
// читал про динамический импорт через import(), но все равно файлы в зависимотях
// сразу подключаются, либо я не оч понял про динамический импорт
export const elements = [dateCalcForm, timerDateCalcForm];

controlBlock.addEventListener("click", (event) => switcher(event, elements));

// не могу понять, как сделать функцию напрмиер для калькулятора дат таким образом
// чтобы не передавть ей элемент куда выводить результат,
// а в ней вернуть результат как строку для вывода и здесб в main его прокидывать
// идея только какой-то Promise сделать, но так и не понял
dateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleCalcDates(event, dateCalcResult);
});

// я думал все таки нужен таймер даты, раз в задании написано вынести общие функции
// в отдельный файл
// пауза работает и продолжить тоже, не понял только опять же как правильно сделать
// отдельный файл, чтобы не прокидывать в каждую функцию элемент, куда рещультат выводить
// еще если нажимать нескоько раз "начать", то запускается много таймеров, старый не очиащается
// хотя вроде clearInterval() ставлю
timerDateCalcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const [inputEl, _, buttonPause, buttonResume] = event.target.elements;
  let firstDate = DateTime.fromISO(inputEl.value);

  let timer;
  let diff;

  if (!firstDate.isValid) {
    console.log("input is invalid");
    dateTimerCalcResult.innerHTML = formatError(
      "Некеорректные исхожные данные.",
    );
    return;
  }

  function newTimer() {
    console.log("timer work");
    dateTimerCalcResult.innerHTML = "";
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
      dateTimerCalcResult.innerHTML = formatError("Таймер истек.");
      clearInterval(timer);
    } else {
      dateTimerCalcResult.innerHTML = diffToHtml(diff);
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
        dateTimerCalcResult.innerHTML = formatError("Таймер истек.");
        clearInterval(timer);
      } else {
        dateTimerCalcResult.innerHTML = diffToHtml(diff);
      }
    }, 1000);
  });
});

//  ============================================================================

// export const getTimer = (event, dateTimerCalcResult) => {
//   event.preventDefault();

//   const [inputEl, _, buttonPause, buttonResume] = event.target.elements;
//   // console.log(inputEl, buttonPause, buttonResume);

//   const firstDate = DateTime.fromISO(inputEl.value);
//   // console.log("firstDate: ", firstDate);

//   if (!firstDate.isValid) {
//     console.log("input is invalid");
//     dateTimerCalcResult.innerHTML = formatError(
//       "Некеорректные исхожные данные.",
//     );
//     return;
//   }

//   createTimer(firstDate);

//   buttonPause.addEventListener("click", pauseTimer);
//   buttonResume.addEventListener("click", updateTimer);
// };
