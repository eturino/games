import { Meta, Story } from "@storybook/react";
import React from "react";
import { CardSuit, CardValue } from "../../../models/cards";
import { Card, CardProps } from "./Card";

export default {
  title: "Cards/Card",
  component: Card,
  argTypes: {
    cardValue: { control: { type: "select" } },
    cardSuit: { control: { type: "select" } },
  },
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  faceUp: true,
  special: false,
  cardValue: CardValue.J,
  cardSuit: CardSuit.Clubs,
};
