let x = null;
let y = null;
let o = null;
let calculated = false;

const btns = document.querySelectorAll("button");
const field = document.querySelector(".field");

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
  if (this.getAttribute("class") === "number") {
    if (!calculated) {
      if (o === "add" ||
          o === "subtract" ||
          o === "multiply" ||
          o === "divide") {
        if (y === null) y = "";
        y += this.textContent
        field.textContent += this.textContent;
      } else {
        if (x === null) x = "";
        x += this.textContent;
        field.textContent += this.textContent;
      }
    }
  }

  if (this.getAttribute("class") === "operator") {
    if (x !== null && y === null) {
      if (this.textContent === "+") {
        if (o === "add" ||
            o === "subtract" ||
            o === "multiply" ||
            o === "divide") {
          field.textContent = field.textContent.substring(0, field.textContent.length - 1);
          o = "add";
          field.textContent += this.textContent;
        } else {
          o = "add";
          field.textContent += this.textContent;
        }
      }
      if (this.textContent === "-") {
        if (o === "add" ||
            o === "subtract" ||
            o === "multiply" ||
            o === "divide") {
          field.textContent = field.textContent.substring(0, field.textContent.length - 1);
          o = "subtract";
          field.textContent += this.textContent;
        } else {
          o = "subtract";
          field.textContent += this.textContent;
        }
      }
      if (this.textContent === "×") {
        if (o === "add" ||
            o === "subtract" ||
            o === "multiply" ||
            o === "divide") {
          field.textContent = field.textContent.substring(0, field.textContent.length - 1);
          o = "multiply";
          field.textContent += this.textContent;
        } else {
          o = "multiply";
          field.textContent += this.textContent;
        }
      }
      if (this.textContent === "/") {
        if (o === "add" ||
            o === "subtract" ||
            o === "multiply" ||
            o === "divide") {
          field.textContent = field.textContent.substring(0, field.textContent.length - 1);
          o = "divide";
          field.textContent += this.textContent;
        } else {
          o = "divide";
          field.textContent += this.textContent;
        }
      }
    } else {
      if (this.textContent === "=") {
        if (o === "add" ||
            o === "subtract" ||
            o === "multiply" ||
            o === "divide") {
          field.textContent += this.textContent;
          operate(parseInt(x), parseInt(y), o);
          calculated = true;
        }
      }
    }
  }

  if (this.getAttribute("class") === "clear") {
    field.textContent = "";
    x = null;
    y = null;
    o = null;
    calculated = false;
  }
}

function operate(x, y, o) {
  if (o === "add") return add(x, y);
  if (o === "subtract") return subtract(x, y);
  if (o === "multiply") return multiply(x, y);
  if (o === "divide") return divide(x, y);
}

function add(x, y) {
  o = null;
  field.textContent += (x + y);
  return x + y;
}

function subtract(x, y) {
  o = null;
  field.textContent += (x - y);
  return x - y;
}

function multiply(x, y) {
  o = null;
  field.textContent += (x * y);
  return x * y;
}

function divide(x, y) {
  if (x === 0 || y === 0) {
    o = null;
    field.textContent = "Can't divide by zero, silly!";
    return x / y;
  } else {
    o = null;
    field.textContent += (x / y);
  }
}
