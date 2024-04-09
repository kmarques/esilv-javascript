export function HashLink(path, title) {
  const link = document.createElement("a");
  link.href = "#" + path;
  link.appendChild(document.createTextNode(title));
  return link;
}

export default function HashRouter(rootElement, routes) {
  function manageRoute() {
    const path = window.location.hash.slice(1);
    const pageFunction = routes[path];

    if (rootElement.childNodes[0])
      rootElement.replaceChild(pageFunction(), rootElement.childNodes[0]);
    else rootElement.appendChild(pageFunction());
  }

  window.addEventListener("hashchange", manageRoute);
  manageRoute();
}
