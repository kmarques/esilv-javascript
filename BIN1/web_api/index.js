const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
const data = JSON.parse(localStorage.getItem("data") || "{}");

function onBlur(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  data[td.dataset.coordinate] = text;
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem(td.dataset.coordinate, text);
  td.replaceChild(textNode, input);
  td.addEventListener("click", onClick);
  input.removeEventListener("blur", onBlur);
}

function onClick(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.replaceChild(input, textNode);
  input.focus();
  input.addEventListener("blur", onBlur);
  td.removeEventListener("click", onClick);
}

for (let rowIndex = 0; rowIndex < 20; rowIndex++) {
  const tr = document.createElement("tr");
  for (let colIndex = 0; colIndex < 20; colIndex++) {
    const td = document.createElement("td");
    td.dataset.coordinate = `${rowIndex},${colIndex}`;
    const savedValue = localStorage.getItem(td.dataset.coordinate) || "Default";
    const text = document.createTextNode(savedValue);
    td.appendChild(text);
    tr.appendChild(td);
    td.addEventListener("click", onClick);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);
root.appendChild(table);
