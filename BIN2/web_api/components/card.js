export default function Card(props = {}) {
  const imageSrc = props.imageSrc;
  const title = props.title;
  const onClick = props.onClick;

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
