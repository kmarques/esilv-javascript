export default function generateStructure(structure) {
  const element = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attrName in structure.attributes) {
      if (/on[A-Z]/.test(attrName)) {
        element.addEventListener(
          attrName.slice(2).toLowerCase(),
          structure.attributes[attrName]
        );
      } else if (/data[A-Z]/.test(attrName)) {
        element.dataset[attrName.slice(4).toLowerCase()] =
          structure.attributes[attrName];
      } else element.setAttribute(attrName, structure.attributes[attrName]);
    }
  }
  if (structure.children) {
    for (let child of structure.children) {
      let childElement;
      if (typeof child === "string") {
        childElement = document.createTextNode(child);
      } else {
        childElement = generateStructure(child);
      }
      element.appendChild(childElement);
    }
  }

  return element;
}
