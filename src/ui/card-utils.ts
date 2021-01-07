import { CardInfo } from "../models/card-types";

export const cardImageFilenameBack = "/img/cards/back.png";

export function cardImageFilename(cardInfo: CardInfo): string {
  return `/img/cards/front-${cardInfo.cardSuit.toLowerCase()}-${cardInfo.cardValue}.png`;
}
