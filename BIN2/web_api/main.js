import HistoryRouter from "./components/HistoryRouter.js";
import Page1 from "./pages/Page1.js";
import Page1Simple from "./pages/Page1Simple.js";
import Page1Structure from "./pages/Page1Struct.js";
import Page2 from "./pages/Page2.js";
import Page404 from "./pages/Page404.js";

const root = document.getElementById("root");

const routes = {
  "/page1": Page1,
  "/page2": Page2,
  "/simple": Page1Simple,
  "/page1Struct": Page1Structure,
  "*": Page404,
};

HistoryRouter(routes, root);
