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

const gallery = {
  type: "div",
  children: Array.from({ length: 500 }, (_, index) => ({
    type: "img",
    attributes: [["src", "https://picsum.photos/200/300?random=" + index]],
  })),
};

const demo1Structure = {
  type: "div",
  children: [
    gallery,
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
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      }
      if (typeof child === "object") {
        const subElem = generateStructure(child);
        element.appendChild(subElem);
      }
    }
  }

  return element;
}

const root = document.getElementById("root");
root.appendChild(generateStructure(demo1Structure));
