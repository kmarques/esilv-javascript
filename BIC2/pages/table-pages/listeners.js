import { getData, saveData } from "../../lib/storage.js";

export function switchToInput(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.removeChild(textNode);
  td.appendChild(input);
  input.focus();
  td.removeEventListener("click", switchToInput);
  input.addEventListener("focusout", switchToText);
}

export function switchToText(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  const coords = td.getAttribute("coords");
  const data = getData("data");
  data[coords] = text;
  saveData("data", data);

  td.replaceChild(textNode, input);
}
