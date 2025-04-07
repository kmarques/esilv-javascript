function generateStructure(structure) {
  const element = document.createElement(structure.tag);
  if (structure.attributes) {
    for (let attrName in structure.attributes) {
      const attrValue = structure.attributes[attrName];
      if (attrName.startsWith("data")) {
        const datasetName = attrName.slice(4).toLowerCase();
        element.dataset[datasetName] = attrValue;
      } else {
        element.setAttribute(attrName, attrValue);
      }
    }
  }
  if (structure.events) {
    for (let eventName in structure.events) {
      const eventListeners = structure.events[eventName];
      for (let eventListener of eventListeners) {
        element.addEventListener(eventName, eventListener);
      }
    }
  }
  if (structure.children) {
    for (let child of structure.children) {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (typeof child === "object") {
        element.appendChild(generateStructure(child));
      }
    }
  }
  return element;
}

const root = document.getElementById("root");
function onClick() {}
function onBlur() {}
const structure = {
  tag: "td",
  attributes: {
    dataCoordinate: "0,0",
    colspan: 2,
  },
  events: {
    click: [onClick],
  },
  children: [
    "Default",
    {
      tag: "input",
      events: {
        blur: [onBlur],
      },
      attributes: {
        value: "Default",
      },
    },
  ],
};

const tableStructure = {
  tag: "table",
  children: [
    {
      tag: "tbody",
      children: Array.from({ length: 20 }, (_, rowIndex) => ({
        tag: "tr",
        children: Array.from({ length: 20 }, (_, colIndex) => ({
          tag: "td",
          attributes: {
            dataCoordinate: `${rowIndex},${colIndex}`,
          },
          children: ["Default"],
        })),
      })),
    },
  ],
};

const imageList = {
  tag: "div",
  children: Array.from({ length: 15 }, (_, index) => ({
    tag: "img",
    attributes: {
      src: "https://picsum.photos/200/300?random=" + index,
    },
  })),
};

root.appendChild(generateStructure(imageList));
