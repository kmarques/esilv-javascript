function onClick() {}
function onBlur() {}
export default {
  tag: "td",
  attributes: {
    dataCoordinate: "0,0",
    colspan: 2,
  },
  events: {
    click: [onClick],
  },
  children: [
    "Default",
    {
      tag: "input",
      events: {
        blur: [onBlur],
      },
      attributes: {
        value: "Default",
      },
    },
  ],
};
