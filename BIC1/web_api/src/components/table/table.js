import { switchToInput } from "./listeners.js";

export default function generateTable(data) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  table.appendChild(thead);
  const trHead = document.createElement("tr");
  thead.appendChild(trHead);
  const firstLine = data[0];
  for (let key in firstLine) {
    const th = document.createElement("th");
    trHead.appendChild(th);
    th.appendChild(document.createTextNode(key));
  }

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    const line = data[rowIndex];
    const tr = document.createElement("tr");
    tr.dataset.item = line;
    tbody.appendChild(tr);
    for (let [key, value] of Object.entries(line)) {
      const td = document.createElement("td");
      tr.appendChild(td);
      const textNode = document.createTextNode(value);
      td.appendChild(textNode);
      td.dataset.column = key;
      td.dataset.row = rowIndex;
      td.addEventListener("click", switchToInput);
    }
  }

  return table;
}
