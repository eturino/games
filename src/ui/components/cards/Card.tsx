/** @jsxRuntime classic */
/** @jsx jsx */
import { FunctionComponent } from "react";
import { jsx } from "theme-ui";
import { CardSuit, CardValue } from "../../../models/cards";
import { BackCardImage, FaceCardImage } from "./CardImage";
import { UICard } from "./UICard";

export interface CardProps {
  faceUp: boolean;
  cardValue: CardValue;
  cardSuit: CardSuit;
  special?: boolean;
  onClick?: () => void;
}

export const Card: FunctionComponent<CardProps> = ({ faceUp, cardValue, cardSuit, special, onClick }) => {
  return (
    <UICard
      faceUp={faceUp}
      renderDown={() => <BackCardImage />}
      renderUp={() => <FaceCardImage cardInfo={{ cardValue, cardSuit }} />}
      withBorder={special}
      onClick={onClick}
    />
  );
};
