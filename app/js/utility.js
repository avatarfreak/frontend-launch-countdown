//Pipe
export const pipe =
  (...fns) =>
  (data) =>
    fns.reduce((acc, fn) => fn(acc), data);

//insert zero in the front of single digit
export const padZero = (num) => (num >= 0 && num < 10 ? `0${num}` : num);

//set value
export const setValue = (val) => val;

/*===========Dom Related ==============*/
export const selectors = (el) => document.querySelectorAll(el);
export const selector = (el) => document.querySelector(el);

//Extract out data-* attribute from html elements
//return elements as an array
export const getDataAttrName = (dataset) => {
  const pattern = /data.+?(?=\=)/g; //search for data-*
  let dataAttr = dataset.map((element) => element.outerHTML.match(pattern)).join("");
  return [dataset, dataAttr];
};

//combine padZero and setValue and make new function
export const setDataValue = pipe(padZero, setValue);

//Set value to given data-attribute
export const setValueToAttribute = (value) => (dataset) => {
  const [elements, dataAttr] = dataset;
  const attr = dataAttr.split(",");

  return elements.reduce((element, nextElement) => {
    let prev = value === 0 ? 59 : value - 1;
    prev = setDataValue(prev);
    value = setDataValue(value);

    element.setAttribute(attr[0], value); //data-*

    let child = element.firstElementChild;

    child.setAttribute(attr[1], value); //data-*
    setTimeout(() => {
      child.setAttribute(attr[2], prev); //data-*-next
      nextElement.textContent = prev; //data-*-next
    }, 350);
  });
};

//Update Dom elements
export const updateDom = (field, value) => {
  pipe(getDataAttrName, setValueToAttribute(value))(field);
};
