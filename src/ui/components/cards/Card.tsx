/** @jsxRuntime classic */
/** @jsx jsx */
import { FunctionComponent } from "react";
import { jsx } from "theme-ui";
import { CardSuit, CardValue } from "../../../models/card-types";
import { BackCardImage, FaceCardImage } from "./CardImage";
import { UICard } from "./UICard";

export interface CardProps {
  faceUp: boolean;
  cardValue: CardValue;
  cardSuit: CardSuit;
  onClick: () => void;
}

export const Card: FunctionComponent<CardProps> = ({ faceUp, cardValue, cardSuit, onClick }) => {
  return (
    <UICard
      faceUp={faceUp}
      renderDown={() => <BackCardImage />}
      renderUp={() => <FaceCardImage cardInfo={{ cardValue, cardSuit }} />}
      onClick={onClick}
    />
  );
};
