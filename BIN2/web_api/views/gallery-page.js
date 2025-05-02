import students from "../assets/data/students.js";
import { BrowserLink } from "../components/browser-router.js";
import Card from "../components/card.js";

export default {
  type: "div",
  children: [
    //HashLink("/table", "Page Table"),
    BrowserLink("/table", "Page Table (Browser)"),
    {
      type: "div",
      children: students.map((student, index) =>
        Card("https://picsum.photos/50?random=" + index, student.title)
      ),
    },
  ],
};
