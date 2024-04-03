import generatePage from "../lib/generatePage.js";

export function HashLink(path, title) {
  const link = document.createElement("a");
  link.href = "#" + path;
  link.appendChild(document.createTextNode(title));
  return link;
}

export default function HashRouter(routes, rootElement) {
  function manageRoute() {
    let path = window.location.hash.slice(1);
    if (!routes[path]) path = "*";

    const page = routes[path];
    const pageGenerator =
      typeof page === "function" ? page : () => generatePage(page);
    if (root.childNodes[0]) {
      rootElement.replaceChild(pageGenerator(), root.childNodes[0]);
    } else {
      rootElement.appendChild(pageGenerator());
    }
  }

  window.addEventListener("hashchange", manageRoute);
  manageRoute();
}
