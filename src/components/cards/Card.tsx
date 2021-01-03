import React, { FunctionComponent } from "react";
import { CardSuit, CardValue } from "../../models/card-types";
import { UICard } from "./UICard";

export interface CardProps {
  faceUp: boolean;
  cardValue: CardValue;
  cardSuit: CardSuit;
}

export const Card: FunctionComponent<CardProps> = ({ faceUp, cardValue, cardSuit }) => {
  return (
    <UICard faceUp={faceUp}>
      <h1>
        {cardValue} {cardSuit}
      </h1>
    </UICard>
  );
};
