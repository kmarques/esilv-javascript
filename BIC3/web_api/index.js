const NB_COLS = 20;
const NB_ROWS = 20;

const dataString = localStorage.getItem("clé");
const data = JSON.parse(dataString) || {};

const table = document.createElement("table");
const thead = document.createElement("thead");
const tr = document.createElement("tr");
const rootElement = document.getElementById("root");
rootElement.appendChild(table);
table.appendChild(thead);
thead.appendChild(tr);

for (let i = 0; i < NB_COLS; i++) {
  const th = document.createElement("th");
  const textNode = document.createTextNode(i + 1);
  th.appendChild(textNode);
  tr.appendChild(th);
}

const tbody = document.createElement("tbody");
table.appendChild(tbody);

function switchToInput(event) {
  const td = event.currentTarget;
  const textBox = document.createElement("input");
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  textBox.value = text;
  td.removeChild(textNode);
  td.appendChild(textBox);
  textBox.focus();
  td.removeEventListener("click", switchToInput);
  textBox.addEventListener("blur", function (event) {
    const input = event.currentTarget;
    const textNode = document.createTextNode(input.value);
    const td = input.parentNode;
    const coords = td.getAttribute("coords");
    data[coords] = input.value;
    localStorage.setItem("clé", JSON.stringify(data));
    td.replaceChild(textNode, input);
  });
}

for (let i = 0; i < NB_ROWS; i++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let j = 0; j < NB_COLS; j++) {
    const td = document.createElement("td");
    const coords = `${i},${j}`;
    td.setAttribute("coords", coords);
    const textNode2 = document.createTextNode(data[coords] || "Default");
    td.appendChild(textNode2);

    tr.appendChild(td);
    td.addEventListener("click", switchToInput);
  }
}
