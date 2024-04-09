import generateStructure from "../lib/generateStructure.js";

const Page3 = {
  type: "div",
  attributes: {
    class: "test",
  },
  children: [
    {
      type: "p",
      children: [
        {
          type: "a",
          attributes: {
            href: "#coucou",
          },
          children: ["Coucou link"],
        },
        " : lien vers la page 'Coucou link'",
      ],
    },
  ],
};

export default () => generateStructure(Page3);
