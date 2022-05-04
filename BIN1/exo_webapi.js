// ✅ Générer un tableau de 5 par 5 sous la balise "root" avec une valeur par défaut "Default"
// ✅ Au clique sur une case transformer la valeur par un input contanenant le texte
// ✅ Dès qu'on sort de la case, remplacer l'input par la nouvelle valeur

function Page1() {
  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};

  function toggleInput(event) {
    const inputElement = event.currentTarget;
    const value = inputElement.value;
    const text = document.createTextNode(value);
    const key = inputElement.parentNode.dataset.id;
    data[key] = value;
    localStorage.setItem("data", JSON.stringify(data));
    inputElement.parentNode.addEventListener("click", toggleText);
    inputElement.removeEventListener("blur", toggleInput);
    inputElement.parentNode.replaceChild(text, inputElement);
  }

  function toggleText(event) {
    const tdElement = event.currentTarget;
    const input = document.createElement("input");
    input.value = tdElement.textContent;
    tdElement.replaceChild(input, tdElement.childNodes[0]);
    tdElement.removeEventListener("click", toggleText);
    input.focus();
    input.addEventListener("blur", toggleInput);
  }

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  for (let i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      const td = document.createElement("td");
      td.addEventListener("click", toggleText);
      const key = `${i}x${j}`;
      td.dataset.id = key;
      const text = document.createTextNode(data[key] ?? "Default");
      td.appendChild(text);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  const div = document.createElement("div");
  div.appendChild(
    router.Link("/page2", "Page2", {
      border: "2px solid pink",
    })
  );
  div.appendChild(table);

  return div;
}

function Page2() {
  const h1 = document.createElement("h1");
  const text = document.createTextNode("Hello world!");
  h1.appendChild(text);

  const div = document.createElement("div");
  div.appendChild(router.Link("/page1", "Page1"));
  div.appendChild(h1);

  return div;
}

function Page404() {
  const element = document.createElement("h1");
  element.appendChild(document.createTextNode("Page not found"));

  const div = document.createElement("div");
  for (let page of [
    { path: "/page1", name: "Page1" },
    { path: "/page2", name: "Page2" },
  ]) {
    div.appendChild(router.Link(page.path, page.name));
  }
  div.appendChild(element);

  return div;
}

function HashRouter(rootElement) {
  let element;
  switch (window.location.hash.substring(1)) {
    case "/page1":
      element = Page1();
      break;
    case "/page2":
      element = Page2();
      break;
    default:
      element = Page404();
      break;
  }
  if (rootElement.childNodes.length > 0) {
    rootElement.replaceChild(element, rootElement.childNodes[0]);
  } else {
    rootElement.appendChild(element);
  }
  window.onhashchange = function () {
    HashRouter(rootElement);
  };
}

function BrowserRouter(rootElement) {
  this.render = function () {
    const path = window.location.pathname;
    switch (path) {
      case "/page1":
        element = Page1();
        break;
      case "/page2":
        element = Page2();
        break;
      default:
        element = Page404();
        break;
    }
    if (rootElement.childNodes.length > 0) {
      rootElement.replaceChild(element, rootElement.childNodes[0]);
    } else {
      rootElement.appendChild(element);
    }
  };

  this.Link = function Link(path, name, style = {}) {
    const self = this;
    const a = document.createElement("a");
    a.href = path;
    a.appendChild(document.createTextNode(name));
    for (let key in style) {
      a.style[key] = style[key];
    }
    a.addEventListener("click", function (event) {
      event.preventDefault();
      window.history.pushState({}, name, path);
      self.render();
    });

    return a;
  };

  window.onpopstate = () => this.render();
}

const root = document.getElementById("root");
const router = new BrowserRouter(root);
router.render();
