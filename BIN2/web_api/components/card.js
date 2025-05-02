export default function Card(imageSrc, title, onClick) {
  return {
    type: "div",
    attributes: {
      class: "flex gap-4",
    },
    events: [["click", onClick]],
    children: [
      {
        type: "img",
        attributes: {
          src: imageSrc,
        },
      },
      {
        type: "span",
        children: [title],
      },
    ],
  };
}
