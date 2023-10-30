// const useState = require("./utils/state.js");

// import { useState } from "./utils/state";

const calculationDisplay = document.querySelector("#calculation");
const inputDisplay = document.querySelector("#input");

const clearBtn = document.querySelector("#clear");
const toggleBtn = document.querySelector("#negative-toggle");
const percentageBtn = document.querySelector("#percentage");

const divideBtn = document.querySelector("#divide");
const multiplyBtn = document.querySelector("#multiply");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");
const decimalBtn = document.querySelector("#decimal");
const evaluateBtn = document.querySelector("#evaluate");

const nineBtn = document.querySelector("#nine");
const eightBtn = document.querySelector("#eight");
const sevenBtn = document.querySelector("#seven");
const sixBtn = document.querySelector("#six");
const fiveBtn = document.querySelector("#five");
const fourBtn = document.querySelector("#four");
const threeBtn = document.querySelector("#three");
const twoBtn = document.querySelector("#two");
const oneBtn = document.querySelector("#one");
const zeroBtn = document.querySelector("#zero");

// const [firstValue, setFirstValue] = state.useState("");
// const [secondValue, setSecondValue] = useState("");
// const [operator, setOperator] = useState("");

const buttonReducer = (action, payload) => {
  switch (action) {
    case "input":
      inputDisplay.textContent = inputDisplay.textContent + payload;
    case "operator":
    //do something
    default:
      return;
  }
};

const addListeners = (button, action, payload) => {
  button.addEventListener("click", () => {
    buttonReducer(action, payload);
  });
};

addListeners(zeroBtn, "input", "0");
addListeners(oneBtn, "input", "1");
