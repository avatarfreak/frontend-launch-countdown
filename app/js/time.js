//Time Calculation
export const seconds = (time) => Math.floor((time / 1000) % 60);
export const minutes = (time) => Math.floor((time / (1000 * 60)) % 60);
export const hours = (time) => Math.floor((time / (1000 * 60 * 60)) % 24);
export const days = (time) => Math.floor(time / (1000 * 60 * 60 * 24));

//Total estimated time from now to end date.
export const getTimeDifference = (endDate) => Date.parse(endDate) - Date.parse(new Date());

//Return Boolean
export const predicate = (time) => time === 0;

//Add class to html element
export const addActiveClass = (element) => {
  element.firstElementChild.classList.add("active");
};

//Remove class to html element
export const removeActiveClass = (...elements) => {
  elements.forEach((el) => el.firstElementChild.classList.remove("active"));
};

//Flip Card
export const flipCard = (element) => (predicate) => predicate && addActiveClass(element);

// conditional to check. All elements are truthy or falsy
//return boolean;
export const isTimeZero =
  (...fns) =>
  (time) => {
    return fns.reduce((acc, fn) => {
      //create array depending on passed args
      let lists = [...Array(fns.length).fill(0)];
      return acc && lists.includes(fn(time));
    }, true);
  };
