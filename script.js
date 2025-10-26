let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backButton = document.querySelector(".back");

numberButtons.forEach(button =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach(button =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
decimalButton.addEventListener("click", addDecimal);
backButton.addEventListener("click", backspace);

function appendNumber(num) {
  if (display.textContent === "0" || shouldResetDisplay) resetDisplay();
  display.textContent += num;
}

function resetDisplay() {
  display.textContent = "";
  shouldResetDisplay = false;
}

function setOperator(op) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = op;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;

  if (currentOperator === "÷" && secondNumber === "0") {
    display.textContent = "Try again 👀";
    currentOperator = null;
    return;
  }

  display.textContent = roundResult(
    operate(currentOperator, firstNumber, secondNumber)
  );

  currentOperator = null;
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function addDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1) || "0";
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "×") return a * b;
  if (op === "÷") return a / b;
}
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") addDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();

  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    convertOperatorKey(e.key);
  }
}

function convertOperatorKey(key) {
  let op = key;
  if (key === "*") op = "×";
  if (key === "/") op = "÷";
  setOperator(op);
}


