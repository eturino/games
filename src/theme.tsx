// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swiss from "@theme-ui/preset-swiss";

export default {
  ...swiss,
  styles: {
    ...swiss.styles,
  },
  sizes: {
    container: 768,
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
};
