import generateTable from "../components/table/table.js";
import { getData, setStorageKey } from "../lib/storage.js";

export default function EditableTablePage() {
  setStorageKey("editable-table-data");
  const MAX_ROW = 20;
  const MAX_COL = 20;

  const div = document.createElement("div");
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Editable Table"));
  div.appendChild(title);

  const data = getData(
    Array.from({ length: MAX_ROW }, () =>
      Object.fromEntries(
        Array.from({ length: MAX_COL }, (_, j) => [`col${j + 1}`, "Default"]),
      ),
    ),
  );

  div.appendChild(generateTable(data));

  return div;
}
