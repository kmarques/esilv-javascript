const MAX_ROW = 20;
const MAX_COL = 20;

const root = document.getElementById("root");

const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);

const dataString = localStorage.getItem("tungtungtung sahur");
const data = JSON.parse(dataString) || {};

function switchToText(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  const coords = td.getAttribute("coords");
  data[coords] = text;
  localStorage.setItem("tungtungtung sahur", JSON.stringify(data));
  td.removeChild(input);
  td.appendChild(textNode);
  td.addEventListener("click", switchToInput);
  // td.replaceChild(textNode, input);
}

function switchToInput(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.removeChild(textNode);
  td.appendChild(input);
  input.focus();
  input.addEventListener("focusout", switchToText);
  td.removeEventListener("click", switchToInput);
}

for (let i = 0; i < MAX_ROW; i++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let j = 0; j < MAX_COL; j++) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const coords = `${i},${j}`;
    td.setAttribute("coords", coords);
    const textNode = document.createTextNode(data[coords] ?? "Default");
    td.appendChild(textNode);
    td.addEventListener("click", switchToInput);
  }
}

root.appendChild(table);

function generateTable(data) {
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
  for (let line of data) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let value of Object.values(line)) {
      const td = document.createElement("td");
      tr.appendChild(td);
      const textNode = document.createTextNode(value);
      td.appendChild(textNode);
      td.addEventListener("click", switchToInput);
    }
  }

  return table;
}

// root.appendChild(
//   generateTable([
//     { brand: "Opel", model: "Meriva" },
//     { brand: "Mercedes", model: "Class A" },
//     { brand: "renault", model: "Kadjar" },
//     { brand: "Peugeot", model: "5008" },
//     { brand: "Citröen", model: "C4 Picasso" },
//   ]),
// );
// root.appendChild(
//   generateTable([
//     {
//       name: "Gerry Scotti AI",
//       specie: "Dieu de la TV / Entité Multimodale",
//     },
//     {
//       name: "Maranza",
//       specie: "Humain en survêtement (Homo Lacostus)",
//     },
//     {
//       name: "Il Masseo",
//       specie: "Hurleur professionnel / Streamer",
//     },
//     {
//       name: "Gabibbo",
//       specie: "Monstre rouge en peluche / Justicier",
//     },
//     {
//       name: "Berlusconi (Ghost/AI)",
//       specie: "Légende du Lore italien",
//     },
//     {
//       name: "Peppa Pig Napoletana",
//       specie: "Cochon régionaliste",
//     },
//     {
//       name: "Blur (Tumblurr)",
//       specie: "Roi de la King's League / Créature Twitch",
//     },
//     {
//       name: "Skibidi Salvini",
//       specie: "Politicien de toilette",
//     },
//     {
//       name: "Hasbulla Italiano",
//       specie: "Mini-humain de combat",
//     },
//     {
//       name: "Donato (Con mollica o senza?)",
//       specie: "Marchand de paninis hypnotique",
//     },
//   ]),
// );
//
