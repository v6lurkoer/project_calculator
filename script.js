let x = null;             // first value
let y = null;             // second value
let o = null;             // operator
let oNext = null;         // next operator
let s = null;             // sum
let e = false;            // equality check

const regexNum = /[0-9]/;
const regexDot = /\./;
const regexEq = /=/;
const regexOp = /[+\-*\/]/;
const regexAll = /^[0-9\.+\-*\/=]$/;
const divideByZeroMsg = "Can't divide by zero, silly!";

const btns = document.querySelectorAll("button");
const displayU = document.querySelector("#display-upper");
const displayL = document.querySelector("#display-lower");

btns.forEach((btn) => btn.addEventListener("click", handleClick));
document.addEventListener("keydown", handleKeyboardClick);

function handleClick() {
  this.blur();
  if (this.getAttribute("class") === "number") clickNumber(this.textContent);
  if (this.getAttribute("class") === "operator") clickOperator(this.textContent);
  if (this.getAttribute("id") === "equals") clickEquals(this.textContent);
  if (this.getAttribute("id") === "clear") clickClear();
  if (this.getAttribute("id") === "dot") clickDot(this.textContent);
  if (this.getAttribute("id") === "del") clickDel();
}

function handleKeyboardClick(event) {
  if (regexAll.test(event.key)) {
    if (regexNum.test(event.key)) clickNumber(event.key);
    if (regexOp.test(event.key)) {
      if (event.key === "*") clickOperator("×");
      else if (event.key === "/") clickOperator("÷");
      else clickOperator(event.key);
    }
    if (regexEq.test(event.key)) clickEquals(event.key);
    if (regexDot.test(event.key)) clickDot(event.key);
  }
  if (event.key === "Backspace") clickDel();
  if (event.key === "Escape") clickClear();
  if (event.key === "Enter") clickEquals("=");
}

function clickNumber(btnText) {
  if (s !== divideByZeroMsg) {
    if (e && o === null) {
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

      displayOnlyOneOperatorOrDot();

      displayU.textContent += btnText;
      displayL.textContent += btnText;
      followValueOnDisplay();
    } else if (x !== null && y !== null) {
      oNext = identifyOperator(btnText);

      s = operate(parseFloat(x), parseFloat(y), o);
      if (!Number.isInteger(s) && s !== divideByZeroMsg) s = parseFloat(s.toFixed(3));

      if (s !== divideByZeroMsg) {
        displayOnlyOneOperatorOrDot();

        displayU.textContent += btnText;
        displayL.textContent = s + btnText;
        followValueOnDisplay();

        x = s.toString();
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
  if (x !== null && y !== null && o !== null) {
    s = operate(parseFloat(x), parseFloat(y), o);
    if (!Number.isInteger(s) && s !== divideByZeroMsg) s = parseFloat(s.toFixed(3));

    if (s !== divideByZeroMsg) {
      displayOnlyOneOperatorOrDot();

      displayU.textContent += btnText + s;
      displayL.textContent = s;
      followValueOnDisplay();

      x = s.toString();
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
}

function clickClear() {
  clearValues();
  clearDisplay();
}

function clickDot(btnText) {
  if (displayU.textContent !== "" && !e) {
    if (x !== null && o === null) {
      if (!regexDot.test(x)) {
        x += btnText;
        displayU.textContent += btnText;
        displayL.textContent += btnText;
      }
    } else {
      if (y !== null) {
        if (!regexDot.test(y)) {
          y += btnText;
          displayU.textContent += btnText;
          displayL.textContent += btnText;
        }
      }
    }
  } else {
    if (y !== null) {
      if (!regexDot.test(y)) {
        y += btnText;
        displayU.textContent += btnText;
        displayL.textContent += btnText;
      }
    }
  }
}

function clickDel() {
  let lengthU = displayU.textContent.length-1;
  let lengthL = displayL.textContent.length-1;

  if (s !== divideByZeroMsg) {
    if (x !== null && y !== null & o !== null) {
      if (y.length-1 === 0) {
        y = null;
        displayU.textContent = displayU.textContent.substring(0, lengthU);
        displayL.textContent = displayL.textContent.substring(0, lengthL);
      } else {
        y = y.substring(0, y.length-1);
        displayU.textContent = displayU.textContent.substring(0, lengthU);
        displayL.textContent = displayL.textContent.substring(0, lengthL);
      }
    } else if (x !== null && y === null && o !== null) {
      o = null;
      displayU.textContent = displayU.textContent.substring(0, lengthU);
      displayL.textContent = displayL.textContent.substring(0, lengthL);
    } else if (x !== null && y === null && o === null) {
      if (x.length-1 === 0) {
        x = null;
        displayU.textContent = displayU.textContent.substring(0, lengthU);
        displayL.textContent = displayL.textContent.substring(0, lengthL);
      } else {
        x = x.substring(0, x.length-1);
        displayU.textContent = displayU.textContent.substring(0, lengthU);
        displayL.textContent = displayL.textContent.substring(0, lengthL);
      }
    } else {
      displayU.textContent = displayU.textContent.substring(0, lengthU);
    }
  }
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

function displayOnlyOneOperatorOrDot() {
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
  if (btnText === "+") return "+";
  if (btnText === "-") return "-";
  if (btnText === "×") return "*";
  if (btnText === "÷") return "/";
}

function operate(x, y, o) {
  if (o === "+") return add(x, y);
  if (o === "-") return subtract(x, y);
  if (o === "*") return multiply(x, y);
  if (o === "/") return divide(x, y);
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
  if (y === 0) {
    return divideByZeroMsg;
  } else {
    return x / y;
  }
}
