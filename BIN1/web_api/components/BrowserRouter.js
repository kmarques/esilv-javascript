export function BrowserLink(path, title) {
  const link = document.createElement("a");
  link.href = path;
  link.appendChild(document.createTextNode(title));
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState({}, undefined, path);
    window.dispatchEvent(new Event("pushstate"));
  });
  return link;
}
export function BrowserLinkStruct(path, title) {
  //link.addEventListener("click", (event) => {
  //  event.preventDefault();
  //  window.history.pushState({}, undefined, path);
  //  window.dispatchEvent(new Event("pushstate"));
  //});
  return {
    type: "a",
    attributes: {
      href: path,
    },
    children: [title],
  };
}

export default function BrowserRouter(rootElement, routes) {
  function manageRoute() {
    const path = window.location.pathname;
    const pageFunction = routes[path];

    if (rootElement.childNodes[0])
      rootElement.replaceChild(pageFunction(), rootElement.childNodes[0]);
    else rootElement.appendChild(pageFunction());
  }

  window.addEventListener("popstate", manageRoute);
  window.addEventListener("pushstate", manageRoute);
  manageRoute();
}
