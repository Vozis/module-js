import './style.css'
import { setupCounter } from './counter.js'
import { switcher } from "./src/switcher.js";
import { handleCalcDates } from "./src/date.js";
import { getTimer } from "./src/timer2.js";
import {Howl} from "howler";
import music from './assets/audio/tuturu.mp3'

document.querySelector('#app').innerHTML = `
  <div>
    <div id="controlblock">
      <h3>Выберите тип приложения:</h3>
      <button class="control" id="timerdateapp" data-type="timerdatecalc">
        Таймер даты
      </button>
      <button class="control" id="dateapp" data-type="datecalc">
        Калькулятор дат
      </button>
    </div>
    <form id="timerdatecalc">
      <h3>Таймер обратног отсчета</h3>
      <label>
        <strong>Введите дату и время:</strong>
        <input type="datetime-local" id="dateTimer" />
      </label>
      <button type="submit">Начать</button>
      <br />
      <button type="button" id="pause">Пауза</button>
      <button type="button" id="continue">Продолжить</button>
      <p id="datetimer__result"></p>
    </form>
    <form id="datecalc" hidden>
      <h3>Калькулятор дат</h3>
      <label>
        <strong>Первая дата:</strong>
        <input type="date" name="firstDate" />
      </label>
      <label>
        <strong>Вторая дата:</strong>
        <input type="date" name="secondDate" />
      </label>
      <button type="submit">Расчитать промежуток</button>
      <p id="datecalc__result"></p>
    </form>
  </div>
`

setupCounter(document.querySelector('#counter'))


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
