import generatePage from "../lib/generatePage.js";

export function HistoryLink(path, title) {
  const link = document.createElement("a");
  link.href = path;
  link.appendChild(document.createTextNode(title));
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, path);
    window.dispatchEvent(new Event("pushstate"));
  });
  return link;
}

export default function HistoryRouter(routes, rootElement) {
  function manageRoute() {
    let path = window.location.pathname;
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

  window.addEventListener("popstate", manageRoute);
  window.addEventListener("pushstate", manageRoute);
  manageRoute();
}
