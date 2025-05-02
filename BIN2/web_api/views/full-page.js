import galleryPage from "./gallery-page.js";
import tablePage from "./table-page.js";

export default {
  type: "div",
  children: [{ type: galleryPage }, tablePage],
};
