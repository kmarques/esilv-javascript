export default {
  type: "div",
  attributes: {
    class: "toto",
  },
  children: [
    {
      type: "h1",
      children: ["Coucou"],
    },
    {
      type: "h2",
      children: ["Section 1"],
    },
    {
      type: "h2",
      children: [
        "Section 2",
        {
          type: "strong",
          children: ["Important"],
        },
      ],
    },
  ],
};
