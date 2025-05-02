import generateStructure from "../lib/generate-structure.js";

export default function BrowserRouter(routes, rootElement, options) {
  const basePath = options.basePath || "";
  function generatePage() {
    const path = location.pathname.slice(basePath.length);
    const struct = routes[path] ?? routes["*"];
    const domPage = generateStructure(struct);
    if (rootElement.childNodes.length === 0) {
      rootElement.appendChild(domPage);
    } else {
      rootElement.replaceChild(domPage, rootElement.childNodes[0]);
    }
  }

  generatePage();

  window.addEventListener("popstate", generatePage);
  window.addEventListener("pushstate", generatePage);
}

export function BrowserLink(link, title) {
  return {
    type: "a",
    attributes: {
      href: `/BIN2/web_api${link}`,
    },
    events: [
      [
        "click",
        function (event) {
          event.preventDefault();
          history.pushState(
            {},
            undefined,
            event.currentTarget.getAttribute("href")
          );
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    ],
    children: [title],
  };
}
