const root = document.getElementById("root");

const table = document.createElement("table");
const dataString = localStorage.getItem("data");
const data = JSON.parse(dataString) || {};

function switchToInput(event) {
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

function switchToText(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  const coords = td.getAttribute("coords");
  data[coords] = text;
  localStorage.setItem("data", JSON.stringify(data));

  td.replaceChild(textNode, input);
}

for (let i = 0; i < 20; i++) {
  const tr = document.createElement("tr");
  table.appendChild(tr);
  for (let j = 0; j < 20; j++) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const coords = `${i},${j}`;
    td.setAttribute("coords", coords);
    td.appendChild(document.createTextNode(data[coords] ?? "Default"));
    td.addEventListener("click", switchToInput);
  }
}
root.appendChild(table);
