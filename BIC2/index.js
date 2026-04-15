import pageGenerator from "./pages/table-page.js";

const root = document.getElementById("root");
const table = pageGenerator();
root.appendChild(table);
