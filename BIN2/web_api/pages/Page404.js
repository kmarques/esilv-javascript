import { HistoryLink as Link } from "../components/HistoryRouter.js";

export default function Page404() {
  const div = document.createElement("div");
  div.appendChild(Link("/page1", "Page 1"));
  div.appendChild(Link("/page2", "Page 2"));
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode("Page 404"));
  div.appendChild(h1);
  return div;
}
