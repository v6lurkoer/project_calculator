let x = null;
let y = null;
let o = null;
let oNext = null;
let s = null;
const regexNum = /[0-9]/;
const silly = "Can't divide by zero, silly!";

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
  if (displayU.textContent !== silly) {
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
  if (displayU.textContent !== silly) {
    if (x !== null && y === null) {
      if (btnText === "+") o = "add";
      if (btnText === "-") o = "subtract";
      if (btnText === "×") o = "multiply";
      if (btnText === "÷") o = "divide";

      if (!regexNum.test(displayU.textContent.charAt(displayU.textContent.length-1))) {
        displayU.textContent = displayU.textContent.substring(0, displayU.textContent.length-1);
        displayL.textContent = displayL.textContent.substring(0, displayL.textContent.length-1);
      }

      displayU.textContent += btnText;
      displayL.textContent += btnText;
      followValueOnDisplay();
    } else if (x !== null && y !== null) {
      if (btnText === "+") oNext = "add";
      if (btnText === "-") oNext = "subtract";
      if (btnText === "×") oNext = "multiply";
      if (btnText === "÷") oNext = "divide";

      s = operate(parseFloat(x), parseFloat(y), o);
      if (!Number.isInteger(s) && s !== silly) s = s.toFixed(3);

      if (s !== silly) {
        displayU.textContent += "=" + s + btnText;
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
      }
    }
  }
}

function clickEquals(btnText) {
  if (o !== null && x !== null && y !== null) {
    s = operate(parseFloat(x), parseFloat(y), o);
    if (!Number.isInteger(s) && s !== silly) s = s.toFixed(3);

    if (s !== silly) {
      displayU.textContent += btnText + s;
      displayL.textContent = s;
      followValueOnDisplay();

      x = s;
      y = null;
      s = null;
      o = null;
      oNext = null;
    } else {
      displayU.textContent = s;
      displayL.textContent = s;
      followValueOnDisplay();
      clearValues();
    }
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
}

function clearDisplay() {
  displayU.textContent = "";
  displayL.textContent = "";
}

function followValueOnDisplay() {
  displayU.scrollLeft = displayU.scrollWidth;
  displayL.scrollLeft = displayL.scrollWidth;
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
    return silly;
  } else {
    return (x / y);
  }
}
