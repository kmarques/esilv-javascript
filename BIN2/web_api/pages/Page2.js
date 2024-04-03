import { HistoryLink as Link } from "../components/HistoryRouter.js";

export default function Page2() {
  const div = document.createElement("div");
  div.appendChild(Link("/page1", "Go to Page 1"));
  const input = document.createElement("input");
  input.type = "text";
  div.appendChild(input);
  const button = document.createElement("button");
  button.textContent = "Save";
  div.appendChild(button);
  button.addEventListener("click", function () {
    alert(input.value);
  });
  return div;
}
