const rootDiv = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);

const MAX_ROW = 50;
const MAX_COL = 50;

function onBlur(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  td.replaceChild(textNode, input);
  localStorage.setItem(td.dataset.coord, text);
  input.removeEventListener("blur", onBlur);
  td.addEventListener("click", onClick);
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

for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
    const td = document.createElement("td");
    const coord = `${rowIndex},${colIndex}`;
    td.dataset.coord = coord;
    const text = document.createTextNode(
      localStorage.getItem(coord) || "Default"
    );
    tr.appendChild(td);
    td.appendChild(text);
    td.addEventListener("click", onClick);
  }
}

rootDiv.appendChild(table);
