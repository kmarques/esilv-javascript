import generateStructure from "../lib/generate-structure.js";

let basePath;
let browserRouterStarted = false;

export default function BrowserRouter(routes, rootElement, options) {
  basePath = options.basePath || "";
  browserRouterStarted = true;
  function generatePage() {
    const path = location.pathname.slice(basePath.length);
    const struct = routes[path] ?? routes["*"];
    const domPage = generateStructure(
      typeof struct === "function" ? struct() : struct
    );
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

export function BrowserLink(props = {}) {
  const title = props.title;
  const link = props.link;

  if (!browserRouterStarted)
    throw new Error("BrowserLink must be used with a BrowserRouter");

  return {
    type: "a",
    attributes: {
      href: `${basePath}${link}`,
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
