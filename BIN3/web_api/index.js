const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);
for (let row = 0; row < 5; row++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let col = 0; col < 5; col++) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const text = document.createTextNode("Default");
    td.appendChild(text);
  }
}
root.appendChild(table);
