import { $enum } from "ts-enum-util";

export type CardInfo = {
  cardValue: CardValue;
  cardSuit: CardSuit;
};

export enum CardValue {
  N1 = "1",
  N2 = "2",
  N3 = "3",
  N4 = "4",
  N5 = "5",
  N6 = "6",
  N7 = "7",
  N8 = "8",
  N9 = "9",
  N10 = "10",
  J = "J",
  Q = "Q",
  K = "K",
}

const $CardValue = $enum(CardValue);

export function numericCardValue(x: CardValue): number {
  return $CardValue.indexOfValue(x) + 1;
}

export function sortCardValue(a: CardValue, b: CardValue): number {
  return numericCardValue(a) - numericCardValue(b);
}

export enum CardSuit {
  Spades = "spades",
  Clubs = "clubs",
  Hearts = "hearts",
  Diamonds = "diamonds",
}

const $CardSuit = $enum(CardSuit);

export function iconForCardSuit(x: CardSuit): string {
  if (x === CardSuit.Spades) return "♠";
  if (x === CardSuit.Clubs) return "♣";
  if (x === CardSuit.Hearts) return "♥";
  return "♦";
}

export function numericCardSuit(x: CardSuit): number {
  return $CardSuit.indexOfValue(x) * 100;
}

export function sortCardSuit(a: CardSuit, b: CardSuit): number {
  return numericCardSuit(a) - numericCardSuit(b);
}

export function cardSuitColor(x: CardSuit): "red" | "black" {
  if (x === CardSuit.Diamonds || x === CardSuit.Hearts) {
    return "red";
  } else {
    return "black";
  }
}

export function makeCardInfo(cardSuit: CardSuit, cardValue: CardValue): CardInfo {
  return { cardSuit, cardValue };
}

export function numericCardInfo(x: CardInfo): number {
  return numericCardSuit(x.cardSuit) + numericCardValue(x.cardValue);
}

export function sortCardInfo(a: CardInfo, b: CardInfo): number {
  return numericCardInfo(a) - numericCardInfo(b);
}

export function buildDeck(): CardInfo[] {
  return $CardSuit.getValues().flatMap((suit) => {
    return $CardValue.getValues().map((value) => makeCardInfo(suit, value));
  });
}
