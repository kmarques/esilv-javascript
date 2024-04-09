import { BrowserLink } from "../components/BrowserRouter.js";

export default function Page2() {
  const div = document.createElement("div");
  div.appendChild(BrowserLink("/page1", "Page 1"));
  for (let i = 0; i < 50; i++) {
    const img = document.createElement("img");
    img.src = "https://picsum.photos/200?random=" + i;
    img.loading = "lazy";
    div.appendChild(img);
  }
  return div;
}
