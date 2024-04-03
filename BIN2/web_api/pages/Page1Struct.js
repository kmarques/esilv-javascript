import { MAX_TD, MAX_TR } from "../lib/constants.js";
import { data, textIntoInput } from "./page1Utils.js";

const Page1Structure = {
  type: "div",
  children: [
    {
      type: "table",
      children: Array.from({ length: MAX_TR }, (_, i) => ({
        type: "tr",
        children: Array.from({ length: MAX_TD }, (_, j) => ({
          type: "td",
          attributes: {
            onClick: textIntoInput,
            dataKey: `${i}-${j}`,
          },
          children: [data[`${i}-${j}`] ?? "Default"],
        })),
      })),
    },
  ],
};

export default Page1Structure;
