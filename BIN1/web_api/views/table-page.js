import users from "../assets/data/users.js";
import Link from "../components/link.js";
import Table from "../components/table.js";

export default {
  tag: "div",
  children: [
    {
      tag: "nav",
      children: [
        {
          tag: Link,
          attributes: {
            link: "/gallery",
            title: "Page Gallery",
          },
        },
      ],
    },
    {
      tag: Table,
      attributes: {
        data: Array.from({ length: 15 }, (_) =>
          Array.from({ length: 15 }, () => "Default")
        ),
      },
    },
    {
      tag: Table,
      attributes: {
        data: Array.from({ length: 30 }, (_) =>
          Array.from({ length: 15 }, () => "Default 2")
        ),
      },
    },
    {
      tag: Table,
      attributes: {
        data: users,
      },
    },
  ],
};
