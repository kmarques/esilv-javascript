function HashRouter(routes, rootElement) {
  function generatePage() {
    const path = location.hash.slice(1);
    const struct = routes[path] ?? routes["*"];
    const domPage = generateStructure(struct);
    if (rootElement.childNodes.length === 0) {
      rootElement.appendChild(domPage);
    } else {
      rootElement.replaceChild(domPage, rootElement.childNodes[0]);
    }
  }
  generatePage();
  window.addEventListener("hashchange", generatePage);
}

function HashLink(link, title) {
  return {
    type: "a",
    attributes: {
      href: `#${link}`,
    },
    children: [title],
  };
}
