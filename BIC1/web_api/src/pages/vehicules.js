import generateTable from "../components/table/table.js";
import { getData, setStorageKey } from "../lib/storage.js";

export default function VehiculesPage() {
  setStorageKey("vehicules-data");
  const div = document.createElement("div");
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Vehicules"));
  div.appendChild(title);
  div.appendChild(
    generateTable(
      getData([
        { brand: "Opel", model: "Meriva" },
        { brand: "Mercedes", model: "Class A" },
        { brand: "renault", model: "Kadjar" },
        { brand: "Peugeot", model: "5008" },
        { brand: "Citröen", model: "C4 Picasso" },
      ]),
    ),
  );
  return div;
}
