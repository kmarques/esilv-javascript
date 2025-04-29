import generateStructure from "../lib/generate-structure.js";

let browserRouterStarted = false;
let browserRouterOptions = {};

export default function BrowserRouter(routes, rootElement, options) {
  browserRouterStarted = true;

  browserRouterOptions.basePath = options.basePath ?? "";

  function generatePage() {
    const path = location.pathname.slice(browserRouterOptions.basePath.length);
    const structure = routes[path] ?? routes["*"];
    //if (rootElement.childNodes.length !== 0) {
    if (!rootElement.hasChildNodes()) {
      rootElement.appendChild(generateStructure(structure));
    } else
      rootElement.replaceChild(
        generateStructure(structure),
        rootElement.childNodes[0]
      );
  }
  generatePage();
  window.addEventListener("popstate", generatePage);
  window.addEventListener("pushstate", generatePage);
}

BrowserRouter.isActivated = () => browserRouterStarted;

export const BrowserLink = function (props = {}) {
  const title = props.title;
  const link = props.link;

  if (!browserRouterStarted) {
    throw new Error("Not inside BrowserRouter");
  }
  const realHref = `${browserRouterOptions.basePath}${link}`;
  return {
    tag: "a",
    attributes: {
      href: realHref,
    },
    events: {
      click: [
        function (event) {
          event.preventDefault();
          history.pushState({}, undefined, realHref);
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    },
    children: [title],
  };
};
