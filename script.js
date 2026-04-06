let x = null;     // first value
let y = null;     // second value
let o = null;     // operator
let oNext = null; // next operator
let s = null;     // sum
let e = false;    // equality check
const regexNum = /[0-9]/;
const divideByZeroMsg = "Can't divide by zero, silly!";

const btns = document.querySelectorAll("button");
const displayU = document.querySelector("#display-upper");
const displayL = document.querySelector("#display-lower");

btns.forEach((btn) => btn.addEventListener("click", handleClick));

function handleClick() {
  if (this.getAttribute("class") === "number") clickNumber(this.textContent);
  if (this.getAttribute("class") === "operator") clickOperator(this.textContent);
  if (this.getAttribute("id") === "equals") clickEquals(this.textContent);
  if (this.getAttribute("id") === "clear") clickClear();
}

function clickNumber(btnText) {
  if (s !== divideByZeroMsg) {
    if (e) {
      clearValues();
      clearDisplay();
    }
    if (o === null) {
      if (x === null) x = "";
      x += btnText;
      displayU.textContent += btnText;
      displayL.textContent += btnText;
      followValueOnDisplay();
    } else {
      if (y === null) y = "";
      y += btnText;
      displayU.textContent += btnText;
      displayL.textContent += btnText;
      followValueOnDisplay();
    }
  }
}

function clickOperator(btnText) {
  if (s !== divideByZeroMsg) {
    if (x !== null && y === null) {
      o = identifyOperator(btnText);

      displayOnlyOneOperator();

      displayU.textContent += btnText;
      displayL.textContent += btnText;
      followValueOnDisplay();
    } else if (x !== null && y !== null) {
      oNext = identifyOperator(btnText);

      s = operate(parseFloat(x), parseFloat(y), o);
      if (!Number.isInteger(s) && s !== divideByZeroMsg) s = parseFloat(s.toFixed(3));

      if (s !== divideByZeroMsg) {
        displayU.textContent += btnText;
        displayL.textContent = s + btnText;
        followValueOnDisplay();

        x = s;
        y = null;
        s = null;
        o = oNext;
      } else {
        displayU.textContent = s;
        displayL.textContent = s;
        followValueOnDisplay();
        clearValues();
        e = true;
      }
    }
  }
}

function clickEquals(btnText) {
  s = operate(parseFloat(x), parseFloat(y), o);
  if (!Number.isInteger(s) && s !== divideByZeroMsg) s = parseFloat(s.toFixed(3));

  if (s !== divideByZeroMsg) {
    displayU.textContent += btnText + s;
    displayL.textContent = s;
    followValueOnDisplay();

    x = s;
    y = null;
    s = null;
    o = null;
    oNext = null;
    e = true;
  } else {
    displayU.textContent = s;
    displayL.textContent = s;
    followValueOnDisplay();
    clearValues();
    e = true;
  }
}

function clickClear() {
  clearValues();
  clearDisplay();
}

function clearValues() {
  x = null;
  y = null;
  s = null;
  o = null;
  oNext = null;
  e = false;
}

function clearDisplay() {
  displayU.textContent = "";
  displayL.textContent = "";
}

function followValueOnDisplay() {
  displayU.scrollLeft = displayU.scrollWidth;
  displayL.scrollLeft = displayL.scrollWidth;
}

function displayOnlyOneOperator() {
  let lastCharIndexU = displayU.textContent.length-1;
  let lastCharU = displayU.textContent.charAt(lastCharIndexU);
  if (!regexNum.test(lastCharU)) {
    displayU.textContent = displayU.textContent.substring(0, lastCharIndexU);
  }

  let lastCharIndexL = displayL.textContent.length-1;
  let lastCharL = displayL.textContent.charAt(lastCharIndexL);
  if (!regexNum.test(lastCharL)) {
    displayL.textContent = displayL.textContent.substring(0, lastCharIndexL);
  }
}

function identifyOperator(btnText) {
  if (btnText === "+") return "add";
  if (btnText === "-") return "subtract";
  if (btnText === "×") return "multiply";
  if (btnText === "÷") return "divide";
}

function operate(x, y, o) {
  if (o === "add") return add(x, y);
  if (o === "subtract") return subtract(x, y);
  if (o === "multiply") return multiply(x, y);
  if (o === "divide") return divide(x, y);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (x === 0 || y === 0) {
    return divideByZeroMsg;
  } else {
    return x / y;
  }
}
