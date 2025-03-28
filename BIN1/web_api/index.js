const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
  const tr = document.createElement("tr");
  for (let colIndex = 0; colIndex < 5; colIndex++) {
    const td = document.createElement("td");
    const text = document.createTextNode("Default");
    td.appendChild(text);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);
root.appendChild(table);
