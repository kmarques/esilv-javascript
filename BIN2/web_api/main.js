const MAX_TR = 50;
const MAX_TD = 50;
const data = /* get data from storage */ JSON.parse(
  localStorage.getItem("data") || "{}"
);

function HashLink(path, title) {
  const link = document.createElement("a");
  link.href = "#" + path;
  link.appendChild(document.createTextNode(title));
  return link;
}

function HistoryLink(path, title) {
  const link = document.createElement("a");
  link.href = path;
  link.appendChild(document.createTextNode(title));
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, path);
    window.dispatchEvent(new Event("pushstate"));
  });
  return link;
}

function Page1() {
  const div = document.createElement("div");
  div.appendChild(Link("/page2", "Go to Page 2"));
  const table = document.createElement("table");
  div.appendChild(table);
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

  return div;
}

function Page2() {
  const div = document.createElement("div");
  div.appendChild(Link("/page1", "Go to Page 1"));
  const input = document.createElement("input");
  input.type = "text";
  div.appendChild(input);
  const button = document.createElement("button");
  button.textContent = "Save";
  div.appendChild(button);
  button.addEventListener("click", function () {
    alert(input.value);
  });
  return div;
}

function Page404() {
  const div = document.createElement("div");
  div.appendChild(Link("/page1", "Page 1"));
  div.appendChild(Link("/page2", "Page 2"));
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode("Page 404"));
  div.appendChild(h1);
  return div;
}

let Link;
function HashRouter(routes, rootElement) {
  Link = HashLink;
  function manageRoute() {
    let path = window.location.hash.slice(1);
    if (!routes[path]) path = "*";

    if (root.childNodes[0]) {
      rootElement.replaceChild(routes[path](), root.childNodes[0]);
    } else {
      rootElement.appendChild(routes[path]());
    }
  }

  window.addEventListener("hashchange", manageRoute);
  manageRoute();
}

function HistoryRouter(routes, rootElement) {
  Link = HistoryLink;
  function manageRoute() {
    let path = window.location.pathname;
    if (!routes[path]) path = "*";

    if (root.childNodes[0]) {
      rootElement.replaceChild(routes[path](), root.childNodes[0]);
    } else {
      rootElement.appendChild(routes[path]());
    }
  }

  window.addEventListener("popstate", manageRoute);
  window.addEventListener("pushstate", manageRoute);
  manageRoute();
}

const PageSimple = {
  type: "div",
  attributes: {
    class: "toto",
  },
  children: [
    {
      type: "h1",
      children: ["Coucou"],
    },
    {
      type: "h2",
      children: ["Section 1"],
    },
    {
      type: "h2",
      children: [
        "Section 2",
        {
          type: "strong",
          children: ["Important"],
        },
      ],
    },
  ],
};

const Page1Structure = {
  type: "div",
  children: [
    {
      type: "table",
      children: Array.from({ length: MAX_TR }, (_, i) => ({
        type: "tr",
        children: Array.from({ length: MAX_TD }, (_, j) => ({
          type: "td",
          children: [data[`${i}-${j}`] ?? "Default"],
        })),
      })),
    },
  ],
};

function generatePage(structure) {
  const element = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attrName in structure.attributes) {
      element.setAttribute(attrName, structure.attributes[attrName]);
    }
  }
  if (structure.children) {
    for (let child of structure.children) {
      let subElement;
      if (typeof child === "string") {
        subElement = document.createTextNode(child);
      } else {
        subElement = generatePage(child);
      }
      element.appendChild(subElement);
    }
  }

  return element;
}

const root = document.getElementById("root");
const routes = {
  "/page1": Page1,
  "/page2": Page2,
  "/simple": () => generatePage(PageSimple),
  "/page1Struct": () => generatePage(Page1Structure),
  "*": Page404,
};
HistoryRouter(routes, root);
