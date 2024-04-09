import BrowserRouter from "./components/BrowserRouter.js";
import Page1 from "./pages/Page1.js";
import Page2 from "./pages/Page2.js";
import Page3 from "./pages/Page3.js";
import Page4 from "./pages/Page4.js";

const routes = {
  "/page1": Page1,
  "/page2": Page2,
  "/page3": Page3,
  "/page4": Page4,
};

const root = document.getElementById("root");
BrowserRouter(root, routes);
