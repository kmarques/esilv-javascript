// ✅ Générer un tableau de 5 par 5 sous la balise "root" avec une valeur par défaut "Default"
// ✅ Au clique sur une case transformer la valeur par un input contanenant la valeur
// ✅ Dès qu'on sort de la case, remplacer l'input par la nouvelle valeur

function Page1() {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};

  // Remplacement du text par l'input
  function toggleText(event) {
    // Récupérer l'élément cliqué
    const tdElement = event.currentTarget;
    // Création de l'input
    const input = document.createElement("input");
    input.value = tdElement.textContent;
    // Remplacer le textNode par l'input
    tdElement.replaceChild(input, tdElement.childNodes[0]);
    tdElement.removeEventListener("click", toggleText);
    input.addEventListener("blur", toggleInput);
    input.focus();
  }

  function toggleInput(event) {
    // Récuper l'input au lost focus
    const inputElement = event.currentTarget;
    const value = inputElement.value;
    // Stocker la valeur
    const key = inputElement.parentNode.dataset.key;
    data[key] = value;
    localStorage.setItem("data", JSON.stringify(data));
    // Création d'un textNode à partir de la value
    const textNode = document.createTextNode(value);
    // Remplacer l'input par le textNode
    inputElement.removeEventListener("blur", toggleInput);
    inputElement.parentNode.replaceChild(textNode, inputElement);
  }

  for (let i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      const td = document.createElement("td");
      const key = `${i}-${j}`;
      td.dataset.key = key;
      const text = document.createTextNode(data[key] ?? "Default");
      td.addEventListener("click", toggleText);
      td.appendChild(text);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  const div = document.createElement("div");
  const a = document.createElement("a");
  a.href = "#/page2";
  const aText = document.createTextNode("Page 2");
  a.appendChild(aText);
  div.appendChild(a);
  div.appendChild(table);
  return div;
}

function Page2() {
  const h1 = document.createElement("h1");
  const text = document.createTextNode("Hello world!");
  h1.appendChild(text);

  const div = document.createElement("div");
  const a = document.createElement("a");
  a.href = "#/page1";
  const aText = document.createTextNode("Page 1");
  a.appendChild(aText);
  div.appendChild(a);
  div.appendChild(h1);
  return div;
}
function HashRouter(rootElement) {
  const hashPath = window.location.hash.slice(1);
  let element;
  switch (hashPath) {
    case "/page1":
      element = Page1();
      break;
    case "/page2":
      element = Page2();
      break;
    default:
      element = Page1();
      break;
  }

  if (rootElement.childNodes.length === 0) rootElement.appendChild(element);
  else rootElement.replaceChild(element, rootElement.childNodes[0]);

  window.onhashchange = function () {
    HashRouter(rootElement);
  };
}

function HistoryRouter(rootElement) {
  const hashPath = window.location.pathname;
  console.log(hashPath);
  let element;
  switch (hashPath) {
    case "/page1":
      element = Page1();
      break;
    case "/page2":
      element = Page2();
      break;
    default:
      element = Page1();
      break;
  }

  if (rootElement.childNodes.length === 0) rootElement.appendChild(element);
  else rootElement.replaceChild(element, rootElement.childNodes[0]);
}

//HashRouter(document.getElementById("root"));
HistoryRouter(document.getElementById("root"));
