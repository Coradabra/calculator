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
  { selector: "#percentage", action: "percentage", payload: "percentage" },
  { selector: "#decimal", action: "input", payload: "." },
];

const operatorSymbols = {
  plus: "+",
  minus: "−",
  multiply: "×",
  divide: "÷",
  blank: "",
};

const calculationDisplay = document.querySelector("#calculation");
const inputDisplay = document.querySelector("#input");

let firstValue = "";
let secondValue = "";
let operator = "";
let inputValue = inputDisplay.textContent;

const trimDisplayValue = (valueStr) => {
  return valueStr.length >= 9 ? valueStr.substring(0, 9) : valueStr;
};

const evaluate = () => {
  const preEvaluate = (str) => {
    if (str.indexOf("%") >= 0) {
      str = str.replace("%", "");
      return Number(str) / 100;
    } else {
      return Number(str);
    }
  };

  const a = preEvaluate(firstValue);
  const b = preEvaluate(secondValue);

  switch (operator) {
    case "plus":
      return `${a + b}`;
    case "minus":
      return `${a - b}`;
    case "multiply":
      return `${a * b}`;
    case "divide":
      return `${a / b}`;
  }
};

const setInputValue = (newValue, replace = false) => {
  if (inputValue === "0" || replace) {
    inputValue = newValue;
  } else if (inputValue === "-0") {
    inputValue = "-" + newValue;
  } else if (inputValue.indexOf("%") >= 0) {
    const trimmedValue = inputValue.replace("%", "");
    inputValue = trimmedValue + newValue + "%";
  } else {
    inputValue = inputValue + newValue;
  }

  const displayValue = trimDisplayValue(inputValue);
  inputDisplay.textContent = displayValue;
  return;
};

const setFirstValue = (newValue) => {
  firstValue = newValue;
  const displayValue = trimDisplayValue(firstValue);
  calculationDisplay.textContent = displayValue;
};

const setSecondValue = (newValue) => {
  secondValue = newValue;

  const displayFirstValue = trimDisplayValue(firstValue);
  const displaySecondValue = trimDisplayValue(secondValue);

  if (secondValue === "") {
    calculationDisplay.textContent = `${displayFirstValue} ${operatorSymbols[operator]}`;
  } else {
    calculationDisplay.textContent = `${displayFirstValue} ${operatorSymbols[operator]} ${displaySecondValue} =`;
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
      const answer = evaluate();
      setInputValue(answer, true);
      return;
    case "clear":
      setFirstValue("");
      setSecondValue("");
      setOperator("blank");
      setInputValue("0", true);
      calculationDisplay.textContent = "...";
      return;
    case "toggle":
      let toggledValue = "";
      if (inputValue.indexOf("-") >= 0) {
        toggledValue = inputValue.replace("-", "");
      } else {
        toggledValue = "-" + inputValue;
      }
      setInputValue(toggledValue, true);
      return;
    case "percentage":
      let percentageValue = "";
      if (inputValue.indexOf("%") >= 0) {
        percentageValue = inputValue.replace("%", "");
      } else {
        percentageValue = inputValue + "%";
      }
      setInputValue(percentageValue, true);
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
