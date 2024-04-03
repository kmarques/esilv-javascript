export default function generatePage(structure) {
  const element = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attrName in structure.attributes) {
      if (/on[A-Z]/.test(attrName)) {
        element.addEventListener(
          attrName.replace("on", "").toLowerCase(),
          structure.attributes[attrName]
        );
      } else if (/data[A-Z]/.test(attrName)) {
        element.dataset[attrName.replace("data", "").toLowerCase()] =
          structure.attributes[attrName];
      } else element.setAttribute(attrName, structure.attributes[attrName]);
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
