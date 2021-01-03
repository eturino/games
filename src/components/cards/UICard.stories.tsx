/** @jsxRuntime classic */
/** @jsx jsx */
import { Meta, Story } from "@storybook/react";
import { jsx } from "theme-ui";
import { UICard, UICardProps } from "./UICard";

export default {
  title: "Cards/UICard",
  component: UICard,
  argTypes: {},
} as Meta;

const Template: Story<UICardProps> = (args) => <UICard {...args} />;

export const Up = Template.bind({});
Up.args = {
  faceUp: true,
};

export const Down = Template.bind({});
Down.args = {
  faceUp: false,
};
