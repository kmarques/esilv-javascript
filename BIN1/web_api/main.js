const MAX_TR = 12;
const MAX_TD = 12;
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
    /** @var {KeyboardEvent} event */
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

  // save data into localStorage
  const key = td.dataset.key;
  localStorage.setItem(key, input.value);
  td.replaceChild(textNode, input);
  input.removeEventListener("blur", inputIntoText);
}

for (let i = 0; i < MAX_TR; i++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let j = 0; j < MAX_TD; j++) {
    const col = document.createElement("td");
    // Get data for cell
    const key = `${i},${j}`;
    col.dataset.key = key;
    const value = localStorage.getItem(key);
    const text = document.createTextNode(value || "Default");
    col.appendChild(text);
    tr.appendChild(col);
    col.addEventListener("click", textIntoInput);
  }
}
root.appendChild(table);
