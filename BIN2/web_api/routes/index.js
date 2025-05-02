import fullPage from "../views/full-page.js";
import galleryPage from "../views/gallery-page.js";
import homePage from "../views/home-page.js";
import tablePage from "../views/table-page.js";
import page404 from "../views/404-page.js";

export default {
  "/": tablePage,
  "/table": tablePage,
  "/gallery": galleryPage,
  "/full": fullPage,
  "*": page404,
};
