export default function generateStructure(structure) {
  if (typeof structure.tag === "function") {
    //return generateStructure(structure.tag(structure.attributes));
    return generateStructure(structure.tag(structure.attributes));
  }
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
