import Link from "../components/link.js";

export default {
  tag: "div",
  children: [
    {
      tag: "nav",
      children: [
        {
          tag: Link,
          attributes: {
            title: "Page Table",
            link: "/table",
          },
        },
        {
          tag: Link,
          attributes: {
            title: "Page Table Forced Browser",
            link: "/table",
            forceRouter: "hash",
          },
        },
      ],
    },
    {
      tag: "div",
      children: Array.from({ length: 300 }, (_, index) => ({
        tag: "img",
        attributes: {
          src: "https://picsum.photos/200/300?random=" + index,
        },
      })),
    },
  ],
};
