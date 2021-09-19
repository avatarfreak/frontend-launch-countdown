import { pipe, selectors, updateDom } from "./utility.js";

import {
  seconds,
  minutes,
  hours,
  days,
  getTimeDifference,
  flipCard,
  addActiveClass,
  removeActiveClass,
  isTimeZero,
} from "./time.js";

/*============ HTML Elements  Section ===========*/
//Get all day elements having same class
const daysElements = [...selectors(".days")];

//Get all hours elements having same class
const hoursElements = [...selectors(".hours")];

//Get all minutes elements having same class
const minutesElements = [...selectors(".minutes")];

//Get all seconds elements having same class
const secondsElements = [...selectors(".seconds")];

/*============ Countdown Section  ===========*/

//List of html element
const elements = [daysElements, hoursElements, minutesElements, secondsElements];

//list of function
const durations = [days, hours, minutes, seconds];

//Insert Duration Input
let daysInput = 7;
let hoursInput = 0;
let minutesInput = 0;
let secondsInput = 5;

//Extracting first elements from array
//Destructuring Elements
const [daysEl, hoursEl, minutesEl, secondsEl] = [...elements].map((el) => el[0]);
let timeUnits = {
  sec: 1000,
  min: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

//Converting to epoch time.
const endDate = new Date(
  new Date().getTime() +
    daysInput * timeUnits.day +
    hoursInput * timeUnits.hours +
    minutesInput * timeUnits.min +
    secondsInput * timeUnits.sec
);

//CountDown
function countDownStart() {
  const currentDate = getTimeDifference(endDate);

  //update dom elements
  elements.map((element, idx) => {
    let time = durations[idx](currentDate);
    updateDom(element, time);
  });
  //flip seconds card
  addActiveClass(secondsEl);

  //Remove all the before applying.
  removeActiveClass(daysEl, hoursEl, minutesEl);

  //minutesEl
  let flipMinWhenSecReachZero = pipe(isTimeZero(seconds), flipCard(minutesEl));
  flipMinWhenSecReachZero(currentDate);

  //hoursEl
  let flipHoursWhenSecMinReachZero = pipe(isTimeZero(seconds, minutes), flipCard(hoursEl));
  flipHoursWhenSecMinReachZero(currentDate);

  //daysEl
  let flipDayWhenSecMinHoursReachZero = pipe(isTimeZero(seconds, minutes, hours), flipCard(daysEl));
  flipDayWhenSecMinHoursReachZero(currentDate);

  if (currentDate <= 0) {
    removeActiveClass(daysEl, hoursEl, minutesEl, secondsEl);
    clearInterval(timeInterval);
  }
}
const timeInterval = setInterval(countDownStart, 1000);
