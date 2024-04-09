import { BrowserLinkStruct } from "../components/BrowserRouter.js";
import generateStructure from "../lib/generateStructure.js";

function Page1Struct() {
  const MAX_TR = 12;
  const MAX_TD = 12;

  return {
    type: "div",
    children: [
      BrowserLinkStruct("/page2", "Page 2"),
      {
        type: "table",
        children: Array.from({ length: MAX_TR }, (_, i) => ({
          type: "tr",
          children: Array.from({ length: MAX_TD }, (_, j) => ({
            type: "td",
            attributes: {
              onClick: textIntoInput,
              dataKey: `${i}-${j}`,
            },
            children: [localStorage.getItem(`${i}-${j}`) || "Default"],
          })),
        })),
      },
    ],
  };

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
      /** @var {KeyboardEvent} event */
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

    // save data into localStorage
    const key = td.dataset.key;
    localStorage.setItem(key, input.value);
    td.replaceChild(textNode, input);
    input.removeEventListener("blur", inputIntoText);
  }
}

export default () => generateStructure(Page1Struct());
