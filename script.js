let x = null;
let y = null;
let o = null;
let sum = null;
let wasLastX = false;
let calculated = false;
let regexNum = /[0-9]/;

const btns = document.querySelectorAll("button");
const field = document.querySelector("#field");
const currentOp = document.querySelector("#current-op");

btns.forEach((btn) => btn.addEventListener("click", handleClick));

// todo:
// - allow multiple operations in a row instead of one
// - number should fill display height
// - two displays, one for current operation, the other for entire operation
// - hard limit on number length?
// - hard limit on decimal length?
// - allow user to write decimal
// - add "backspace" button
// - add keyboard support

function handleClick() {
  if (this.getAttribute("class") === "number") clickNumber(this.textContent);
  if (this.getAttribute("class") === "operator") clickOperator(this.textContent);
  if (this.getAttribute("id") === "equals") clickEquals(this.textContent);
  if (this.getAttribute("id") === "clear") clickClear();
}

function clickNumber(btnText) {
  if (o !== null) {
    if (y === null) y = "";
    y += btnText;
    field.textContent += btnText;
    wasLastX = false;
  } else {
    if (x === null) x = "";
    x += btnText;
    field.textContent += btnText;
    wasLastX = true;
  }
}

function clickOperator(btnText) {
  if (btnText === "+") {
    if (o !== null) {
      if (!regexNum.test(field.textContent.charAt(field.textContent.length-1))) {
        field.textContent = field.textContent.substring(0, field.textContent.length - 1);
      }
      field.textContent += btnText;
      o = "add";
    } else {
      field.textContent += btnText;
      o = "add";
    }
  }
  if (btnText === "-") {
    if (o !== null) {
      if (!regexNum.test(field.textContent.charAt(field.textContent.length-1))) {
        field.textContent = field.textContent.substring(0, field.textContent.length - 1);
      }
      field.textContent += btnText;
      o = "subtract";
    } else {
      field.textContent += btnText;
      o = "subtract";
    }
  }
  if (btnText === "×") {
    if (o !== null) {
      if (!regexNum.test(field.textContent.charAt(field.textContent.length-1))) {
        field.textContent = field.textContent.substring(0, field.textContent.length - 1);
      }
      field.textContent += btnText;
      o = "multiply";
    } else {
      field.textContent += btnText;
      o = "multiply";
    }
  }
  if (btnText === "÷") {
    if (o !== null) {
      if (!regexNum.test(field.textContent.charAt(field.textContent.length-1))) {
        field.textContent = field.textContent.substring(0, field.textContent.length - 1);
      }
      field.textContent += btnText;
      o = "divide";
    } else {
      field.textContent += btnText;
      o = "divide";
    }
  }
}

function clickEquals(btnText) {
  if (o !== null) {
    if (x !== null && y !== null) {
      sum = operate(parseInt(x), parseInt(y), o);
      if (typeof sum === "number") {
        field.textContent += btnText;
        field.textContent += sum;
        isCalculated();
      } else {
        field.textContent = sum;
        isCalculated();
      }
    }
  }
}

function clickClear() {
  field.textContent = "";
  currentOp.textContent = "";
  x = null;
  y = null;
  o = null;
  calculated = false;
}

function isCalculated() {
  x = sum;
  y = null;
  o = null;
}

function operate(x, y, o) {
  if (o === "add") return add(x, y);
  if (o === "subtract") return subtract(x, y);
  if (o === "multiply") return multiply(x, y);
  if (o === "divide") return divide(x, y);
}

function add(x, y) {
  o = null;
  return x + y;
}

function subtract(x, y) {
  o = null;
  return x - y;
}

function multiply(x, y) {
  o = null;
  return x * y;
}

function divide(x, y) {
  if (x === 0 || y === 0) {
    o = null;
    return "Can't divide by zero, silly!";
  } else {
    o = null;
    return x / y;
  }
}
