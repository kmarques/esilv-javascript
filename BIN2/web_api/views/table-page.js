import { BrowserLink } from "../components/browser-router.js";

function onBlur(event) {
  const input = event.currentTarget;
  const text = input.value;
  const textNode = document.createTextNode(text);
  const td = input.parentNode;
  td.replaceChild(textNode, input);
  localStorage.setItem(td.dataset.coord, text);
  input.removeEventListener("blur", onBlur);
  td.addEventListener("click", onClick);
}

function onTdClick(event) {
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

export default {
  type: "div",
  children: [
    //HashLink("/gallery", "Page Gallery"),
    BrowserLink("/gallery", "Page Gallery (Browser)"),
    {
      type: "table",
      children: [
        {
          type: "tbody",
          children: Array.from({ length: 50 }, (_, rowIndex) => ({
            type: "tr",
            children: Array.from({ length: 50 }, (_, colIndex) => ({
              type: "td",
              attributes: {
                dataCoord: `${rowIndex},${colIndex}`,
              },
              events: [["click", onTdClick]],
              children: [
                localStorage.getItem(`${rowIndex},${colIndex}`) || "Default",
              ],
            })),
          })),
        },
      ],
    },
  ],
};
