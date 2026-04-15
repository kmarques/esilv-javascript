import { getData, saveData } from "../../lib/storage.js";

export function switchToText(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  const item = td.dataset.item;
  const rowIndex = td.dataset.row;
  const data = getData();
  data[rowIndex] = { ...data[rowIndex], [td.dataset.column]: text };
  saveData(data);
  td.removeChild(input);
  td.appendChild(textNode);
  td.addEventListener("click", switchToInput);
  // td.replaceChild(textNode, input);
}

export function switchToInput(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.removeChild(textNode);
  td.appendChild(input);
  input.focus();
  input.addEventListener("focusout", switchToText);
  td.removeEventListener("click", switchToInput);
}
