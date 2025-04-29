// Create a user table with 15 users and 5 properties using a nested array
import BrowserRouter from "./components/browser-router.js";
import HashRouter from "./components/hash-router.js";
import routes from "./routes/index.js";

const root = document.getElementById("root");

// const routesArray = [
//   {path: "/", structure: tableStructure},
// ]

//root.appendChild(generateStructure(tableStructure));
//root.appendChild(generateStructure(imageList));
BrowserRouter(routes, root, { basePath: "/BIN1/web_api" });
