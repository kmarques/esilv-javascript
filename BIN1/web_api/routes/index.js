import tableStructure from "../views/table-page.js";
import imageList from "../views/gallery.js";
import fullPage from "../views/full.js";
import page404 from "../views/page-404.js";

const routes = {
  "/": tableStructure,
  "/table": tableStructure,
  "/gallery": imageList,
  "/full": fullPage,
  "*": page404,
  //"/protected": {
  //  structure: tableStructure,
  //  connected: true
  //}
};

export default routes;
