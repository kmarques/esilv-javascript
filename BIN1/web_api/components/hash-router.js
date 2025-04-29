import generateStructure from "../lib/generate-structure.js";

let hashRouterStarted = false;
export const HashLink = function (props = {}) {
  const title = props.title;
  const link = props.link;

  if (!hashRouterStarted) {
    throw new Error("Not inside HashRouter");
  }

  return {
    tag: "a",
    attributes: {
      href: "#" + link,
    },
    children: [title],
  };
};

export default function HashRouter(routes, rootElement) {
  hashRouterStarted = true;
  function generatePage() {
    const path = location.hash.slice(1);
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
  window.addEventListener("hashchange", generatePage);
}

HashRouter.isActivated = () => hashRouterStarted;
