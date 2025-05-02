import BrowserRouter from "./components/browser-router.js";
import routes from "./routes/index.js";

const root = document.getElementById("root");
BrowserRouter(routes, root, {
  basePath: "/BIN2/web_api",
});
