const Table = function (props = {}) {
  const data = props.data;

  return {
    tag: "table",
    children: [
      {
        tag: "tbody",
        children: data.map((row, rowIndex) => ({
          tag: "tr",
          children: row.map((col, colIndex) => ({
            tag: "td",
            attributes: {
              dataCoordinate: `${rowIndex},${colIndex}`,
            },
            children: [col],
          })),
        })),
      },
    ],
  };
};

export default Table;
