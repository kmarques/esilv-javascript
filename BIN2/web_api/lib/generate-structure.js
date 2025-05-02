export default function generateStructure(structure) {
  if (typeof structure.type === "function")
    return generateStructure(structure.type(structure.attributes));
  const element = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attrName in structure.attributes) {
      const attrValue = structure.attributes[attrName];
      if (/^data[A-Z]/.test(attrName)) {
        const datasetName = attrName.slice(4).toLowerCase();
        element.dataset[datasetName] = attrValue;
      } else element.setAttribute(attrName, attrValue);
    }
  }

  if (structure.events) {
    for (let item of structure.events) {
      element.addEventListener(item[0], item[1]);
    }
  }

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
