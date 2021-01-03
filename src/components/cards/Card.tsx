/** @jsxRuntime classic */
/** @jsx jsx */
import { FunctionComponent } from "react";
import { jsx } from "theme-ui";
import { CardSuit, cardSuitColor, CardValue } from "../../models/card-types";
import { UICard } from "./UICard";

export interface CardProps {
  faceUp: boolean;
  cardValue: CardValue;
  cardSuit: CardSuit;
}

export const Card: FunctionComponent<CardProps> = ({ faceUp, cardValue, cardSuit }) => {
  return (
    <UICard faceUp={faceUp}>
      <h1 sx={{ color: cardSuitColor(cardSuit) }}>
        {cardValue} {cardSuit}
      </h1>
    </UICard>
  );
};
