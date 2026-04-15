import { getData } from "../lib/storage.js";
import { switchToInput } from "./table-pages/listeners.js";

export default function generateTablePage() {
  const table = document.createElement("table");
  const data = getData("data");

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

  return table;
}
