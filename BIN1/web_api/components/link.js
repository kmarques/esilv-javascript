import BrowserRouter, { BrowserLink } from "./browser-router.js";
import HashRouter, { HashLink } from "./hash-router.js";

export default function Link(props = {}) {
  const componentsProps = Object.assign({}, props);
  const forceRouter = componentsProps.forceRouter;
  delete componentsProps.forceRouter;
  if (
    forceRouter === "browser" ||
    (BrowserRouter.isActivated() && !forceRouter)
  ) {
    return {
      tag: BrowserLink,
      attributes: componentsProps,
    };
  } else if (
    forceRouter === "hash" ||
    (HashRouter.isActivated() && !forceRouter)
  ) {
    return {
      tag: HashLink,
      attributes: componentsProps,
    };
  } else {
    throw new Error("No router activated");
  }
}
