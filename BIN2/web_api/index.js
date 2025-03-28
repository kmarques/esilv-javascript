const table = document.createElement("table");
const tbody = document.createElement("tbody");

const MAX_ROW = 50000;
const MAX_COL = 50000;
for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
  const tr = document.createElement("tr");
  for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
    const td = document.createElement("td");
    const text = document.createTextNode("Default");
  }
}
