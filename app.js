const btnConfig = [
  { selector: "#zero", action: "input", payload: "0" },
  { selector: "#one", action: "input", payload: "1" },
  { selector: "#two", action: "input", payload: "2" },
  { selector: "#three", action: "input", payload: "3" },
  { selector: "#four", action: "input", payload: "4" },
  { selector: "#five", action: "input", payload: "5" },
  { selector: "#six", action: "input", payload: "6" },
  { selector: "#seven", action: "input", payload: "7" },
  { selector: "#eight", action: "input", payload: "8" },
  { selector: "#nine", action: "input", payload: "9" },
  { selector: "#divide", action: "operator", payload: "divide" },
  { selector: "#multiply", action: "operator", payload: "multiply" },
  { selector: "#plus", action: "operator", payload: "plus" },
  { selector: "#minus", action: "operator", payload: "minus" },
  { selector: "#evaluate", action: "evaluate" },
  { selector: "#clear", action: "clear", payload: "clear" },
  { selector: "#negative-toggle", action: "toggle" },
  { selector: "#percentage", action: "percentage" },
  { selector: "#decimal", action: "input", payload: "." },
];

const operatorSymbols = {
  plus: "+",
  minus: "−",
  multiply: "×",
  divide: "÷",
};

const calculationDisplay = document.querySelector("#calculation");
const inputDisplay = document.querySelector("#input");

let firstValue = "";
let secondValue = "";
let operator = "";
let inputValue = inputDisplay.textContent;
let negativeInput = false;

const evaluate = () => {
  const a = Number(firstValue);
  const b = Number(secondValue);

  switch (operator) {
    case "plus":
      inputValue = `${a + b}`;
      inputDisplay.textContent = inputValue;
      return;
    case "minus":
      inputValue = `${a - b}`;
      inputDisplay.textContent = inputValue;
      return;
    case "multiply":
      inputValue = `${a * b}`;
      inputDisplay.textContent = inputValue;
      return;
    case "divide":
      inputValue = `${a / b}`;
      inputDisplay.textContent = inputValue;
      return;
  }
};

const setInputValue = (newValue, replace = false) => {
  if (inputValue === "0" || replace) {
    inputValue = newValue;
  } else if (inputValue === "-0") {
    inputValue = "-" + newValue;
  } else {
    inputValue = inputValue + newValue;
  }

  inputDisplay.textContent = inputValue;
  return;
};

const setFirstValue = (newValue) => {
  firstValue = newValue;
  calculationDisplay.textContent = firstValue;
};

const setSecondValue = (newValue) => {
  secondValue = newValue;
  if (secondValue === "") {
    calculationDisplay.textContent = `${firstValue} ${operatorSymbols[operator]}`;
  } else {
    calculationDisplay.textContent = `${firstValue} ${operatorSymbols[operator]} ${secondValue} =`;
  }
};

const setOperator = (newValue) => {
  operator = newValue;
  calculationDisplay.textContent = `${firstValue} ${operatorSymbols[operator]}`;
};

const buttonReducer = (action, payload) => {
  switch (action) {
    case "input":
      setInputValue(payload);
      return;
    case "operator":
      if (secondValue !== "") {
        setFirstValue(inputValue);
        setOperator(payload);
        setSecondValue("");
        setInputValue("0", true);
        return;
      }
      if (firstValue === "") {
        setFirstValue(inputValue);
        setInputValue("0", true);
        setOperator(payload);
        return;
      }
      {
        setOperator(payload);
        const answer = evaluate();
        setInputValue(answer, true);
      }
      return;
    case "evaluate":
      setSecondValue(inputValue);
      evaluate();
      return;
    case "clear":
      setFirstValue("");
      setSecondValue("");
      setOperator("");
      setInputValue("0", true);
      return;
    case "toggle":
      let toggledValue = "";
      if (negativeInput) {
        toggledValue = inputValue.replace("-", "");
      } else {
        toggledValue = "-" + inputValue;
      }
      negativeInput = !negativeInput;
      setInputValue(toggledValue, true);
      return;
    case "percentage":
      return;
  }
};

const configureButtons = (selector, action, payload = "") => {
  const button = document.querySelector(selector);
  button.addEventListener("click", () => {
    buttonReducer(action, payload);
  });
};

for (let btn of btnConfig) {
  configureButtons(btn.selector, btn.action, btn.payload);
}
