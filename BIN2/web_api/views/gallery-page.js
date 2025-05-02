import students from "../assets/data/students.js";
import { BrowserLink } from "../components/browser-router.js";
import Card from "../components/card.js";

export default function Gallery(props = {}) {
  // traitement métier
  return {
    type: "div",
    children: [
      {
        type: "nav",
        children: [
          {
            type: "ul",
            children: [
              {
                type: BrowserLink,
                attributes: {
                  link: "/table",
                  title: "Page Table",
                },
              },
              {
                type: BrowserLink,
                attributes: {
                  link: "/gallery",
                  title: "Page Gallery",
                },
              },
              {
                type: BrowserLink,
                attributes: {
                  link: "/full",
                  title: "Page Full",
                },
              },
            ],
          },
        ],
      },
      {
        type: "div",
        children: students.map((student, index) => ({
          type: Card,
          attributes: {
            imageSrc: "https://picsum.photos/50?random=" + index,
            title: student.title,
          },
        })),
      },
    ],
  };
}
