import EditableTablePage from "./src/pages/edit-table.js";
import ItalianBrainrotAnimalsPage from "./src/pages/itialian-brainrot-animals.js";
import VehiculesPage from "./src/pages/vehicules.js";

const root = document.getElementById("root");

root.appendChild(VehiculesPage());
root.appendChild(ItalianBrainrotAnimalsPage());
root.appendChild(EditableTablePage());
