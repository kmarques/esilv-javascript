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

const tdStructure = {
  type: "td",
  attributes: [
    ["class", "number"],
    ["id", "stat_nb_presents"],
    ["dataPosition", "1,1"],
  ],
  events: {
    click: [onClick],
  },
  children: [
    {
      type: "b",
      children: ["Présentiel"],
    },
  ],
};

const users = [
  { id: "1", lastname: "Dupont", firstname: "Jean" },
  { id: "2", lastname: "Durand", firstname: "Marie" },
  { id: "3", lastname: "Martin", firstname: "Paul" },
  { id: "4", lastname: "Bernard", firstname: "Sophie" },
  { id: "5", lastname: "Lefevre", firstname: "Luc" },
  { id: "6", lastname: "Moreau", firstname: "Claire" },
  { id: "7", lastname: "Dupuis", firstname: "Julien" },
  { id: "8", lastname: "Garnier", firstname: "Alice" },
  { id: "9", lastname: "Rousseau", firstname: "Thomas" },
  { id: "10", lastname: "Lemoine", firstname: "Nathalie" },
];

const productStock = [
  { id: "1", name: "Product A", stock: 10 },
  { id: "2", name: "Product B", stock: 5 },
  { id: "3", name: "Product C", stock: 0 },
  { id: "4", name: "Product D", stock: 20 },
  { id: "5", name: "Product E", stock: 15 },
  { id: "6", name: "Product F", stock: 8 },
  { id: "7", name: "Product G", stock: 12 },
  { id: "8", name: "Product H", stock: 3 },
  { id: "9", name: "Product I", stock: 0 },
  { id: "10", name: "Product J", stock: 25 },
];

function EditableTableComponents(data) {
  return TableComponent(data, onClick);
}

function TableComponent(data, onEditField) {
  const headers = Object.keys(data[0]);

  return {
    type: "table",
    children: [
      {
        type: "thead",
        children: [
          {
            type: "tr",
            children: headers.map((header) => ({
              type: "th",
              children: [header],
            })),
          },
        ],
      },
      {
        type: "tbody",
        children: data.map((item, rowIndex) => ({
          type: "tr",
          children: Object.values(item).map((value, colIndex) => ({
            type: "td",
            attributes: [["dataPosition", `${rowIndex},${colIndex}`]],
            events: { click: [onEditField] },
            children: [value],
          })),
        })),
      },
    ],
  };
}

function HashLink(title, link) {
  return {
    type: "a",
    attributes: [["href", `#${link}`]],
    children: [title],
  };
}

function BrowserLink(title, link) {
  return {
    type: "a",
    attributes: [["href", `/BIN3/web_api${link}`]],
    children: [title],
    events: {
      click: [
        function (event) {
          event.preventDefault();
          history.pushState(
            {},
            undefined,
            event.currentTarget.getAttribute("href")
          );
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    },
  };
}

const gallery = {
  type: "div",
  children: [
    //HashLink("Page Table", "/table"),
    BrowserLink("Page Table", "/table"),
    {
      type: "div",
      children: Array.from({ length: 500 }, (_, index) => ({
        type: "img",
        attributes: [["src", "https://picsum.photos/200/300?random=" + index]],
      })),
    },
  ],
};

const tableStruct = {
  type: "div",
  children: [
    //HashLink("Page Gallery", "/gallery"),
    BrowserLink("Page Gallery", "/gallery"),
    {
      type: "table",
      children: [
        {
          type: "tbody",
          children: Array.from({ length: 15 }, (_, rowIndex) => ({
            type: "tr",
            children: Array.from({ length: 15 }, (_, colIndex) => ({
              type: "td",
              events: {
                click: [onClick],
              },
              attributes: [["dataPosition", `${rowIndex};${colIndex}`]],
              children: [
                localStorage.getItem(`${rowIndex};${colIndex}`) || "Default",
              ],
            })),
          })),
        },
      ],
    },
  ],
};

const demo1Structure = {
  type: "div",
  children: [
    TableComponent(users),
    TableComponent(productStock),
    EditableTableComponents(users),
    gallery,
    tableStruct,
  ],
};

function generateStructure(structure) {
  const element = document.createElement(structure.type);

  if (structure.attributes) {
    for (let attribute of structure.attributes) {
      if (/^data[A-Z]/.test(attribute[0])) {
        const dataName = attribute[0].slice(4).toLowerCase();
        element.dataset[dataName] = attribute[1];
      } else {
        element.setAttribute(attribute[0], attribute[1]);
      }
    }
  }

  if (structure.events)
    for (let eventName in structure.events)
      for (let listener of structure.events[eventName])
        element.addEventListener(eventName, listener);

  if (structure.children) {
    for (let child of structure.children) {
      if (typeof child !== "object") {
        element.appendChild(document.createTextNode(child.toString()));
      }
      if (typeof child === "object") {
        const subElem = generateStructure(child);
        element.appendChild(subElem);
      }
    }
  }

  return element;
}

const page404 = {
  type: "h1",
  children: ["Tu t'es perdu ? Achète une boussole"],
};

const root = document.getElementById("root");

// root.appendChild(generateStructure(demo1Structure));
const routes = {
  "/": demo1Structure,
  "/table": tableStruct,
  "/gallery": gallery,
  "*": page404,
};

function HashRouter(routes, rootElement) {
  function generatePage() {
    const path = location.hash.slice(1);
    const struct = routes[path] ?? routes["*"];
    const dom = generateStructure(struct);
    if (!rootElement.childNodes.length) rootElement.appendChild(dom);
    else rootElement.replaceChild(dom, rootElement.childNodes[0]);
  }

  generatePage();
  window.addEventListener("hashchange", generatePage);
}

function BrowserRouter(routes, rootElement, options) {
  const basePath = options.basePath ?? "";
  function generatePage() {
    const path = location.pathname.slice(basePath.length);
    const struct = routes[path] ?? routes["*"];
    const dom = generateStructure(struct);
    if (!rootElement.childNodes.length) rootElement.appendChild(dom);
    else rootElement.replaceChild(dom, rootElement.childNodes[0]);
  }

  generatePage();
  window.addEventListener("popstate", generatePage);
  window.addEventListener("pushstate", generatePage);
}

BrowserRouter(routes, root, { basePath: "/BIN3/web_api" });
