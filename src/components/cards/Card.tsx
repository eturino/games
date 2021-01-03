import React, { FunctionComponent } from "react";
import { CardSuit, CardValue } from "../../models/card-types";

export interface CardProps {
  cardValue: CardValue;
  cardSuit: CardSuit;
}

export const Card: FunctionComponent<CardProps> = ({ cardValue, cardSuit }) => {
  return (
    <div>
      {cardValue} {cardSuit}
    </div>
  );
};
