import { HistoryLink as Link } from "../components/HistoryRouter.js";
import { MAX_TD, MAX_TR } from "../lib/constants.js";
import { data, textIntoInput } from "./page1Utils.js";

export default function Page1() {
  const div = document.createElement("div");
  div.appendChild(Link("/page2", "Go to Page 2"));
  const table = document.createElement("table");
  div.appendChild(table);
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < MAX_TR; i++) {
    const row = document.createElement("tr");
    tbody.appendChild(row);
    for (let j = 0; j < MAX_TD; j++) {
      const td = document.createElement("td");
      row.appendChild(td);
      const key = `${i},${j}`;
      td.dataset.key = key;
      const value = data[key];
      const textNode = document.createTextNode(value ?? "Default");
      td.appendChild(textNode);

      td.addEventListener("click", textIntoInput);
    }
  }

  return div;
}
