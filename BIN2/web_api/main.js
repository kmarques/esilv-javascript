const MAX_TR = 50;
const MAX_TD = 50;

const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);

function textIntoInput(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.replaceChild(input, textNode);
  td.removeEventListener("click", textIntoInput);
  input.focus();

  input.addEventListener("blur", inputIntoText);
  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      input.removeEventListener("blur", inputIntoText);
      inputIntoText(event);
    }
  });
}

function inputIntoText(event) {
  const input = event.currentTarget;
  const td = input.parentNode;
  const textNode = document.createTextNode(input.value);
  // save data into storage
  const key = td.dataset.key;
  data[key] = input.value;
  localStorage.setItem("data", JSON.stringify(data));
  td.replaceChild(textNode, input);
  input.removeEventListener("blur", inputIntoText);
}

const data = /* get data from storage */ JSON.parse(
  localStorage.getItem("data") || "{}"
);
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

root.appendChild(table);
