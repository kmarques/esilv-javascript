function onBlur(event) {
  const input = event.target;
  const text = input.value;
  const td = input.parentNode;
  localStorage.setItem(td.dataset.position, text);
  const textNode = document.createTextNode(text);
  td.replaceChild(textNode, input);
  td.addEventListener("click", onClick);
  input.removeEventListener("blur", onBlur);
}

function onClick(event) {
  const td = event.currentTarget;
  const textNode = td.childNodes[0];
  const text = textNode.textContent;
  const input = document.createElement("input");
  input.value = text;
  td.replaceChild(input, textNode);
  input.focus();
  input.addEventListener("blur", onBlur);
  td.removeEventListener("click", onClick);
}

const root = document.getElementById("root");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);
for (let row = 0; row < 15; row++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let col = 0; col < 15; col++) {
    const storageValue = localStorage.getItem(`${row};${col}`) || "Default";
    const td = document.createElement("td");
    td.dataset.position = `${row};${col}`;
    td.addEventListener("click", onClick);
    tr.appendChild(td);
    const text = document.createTextNode(storageValue);
    td.appendChild(text);
  }
}
root.appendChild(table);
