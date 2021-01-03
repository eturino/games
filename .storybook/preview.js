import { addDecorator, addParameters } from "@storybook/react";
import { withThemeProvider } from "storybook-addon-theme-ui";
import theme from "../src/theme";

addParameters({
  themeUi: {
    themes: [{ theme, name: "Main Theme" }],
  },
});

addDecorator(withThemeProvider);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // controls: { expanded: true },
};
