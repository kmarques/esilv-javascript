export const data = /* get data from storage */ JSON.parse(
  localStorage.getItem("data") || "{}"
);

export function inputIntoText(event) {
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

export function textIntoInput(event) {
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
