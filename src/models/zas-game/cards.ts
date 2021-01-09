import { $CardValue, buildDeck, CardInfo, CardSuit, CardValue, makeCardInfo } from "../cards";

export type ZasCardInfo = CardInfo & { special: boolean };

export const SpecialValues = calcSpecialValues($CardValue.getValues());

export function zasCardFor(suit: CardSuit, value: CardValue): ZasCardInfo {
  return zasCard(makeCardInfo(suit, value));
}

export function zasCard(cardInfo: CardInfo): ZasCardInfo {
  return { ...cardInfo, special: SpecialValues.includes(cardInfo.cardValue) };
}

export const buildZasDeck = (): ZasCardInfo[] => buildDeck(zasCardFor);

function calcSpecialValues(list: CardValue[]): CardValue[] {
  if (list.length <= 5) return [];

  const isOdd = list.length % 2;

  const middleIndex = Math.floor(list.length / 2);
  const specialIndices = isOdd ? [middleIndex - 1, middleIndex, middleIndex + 1] : [middleIndex - 1, middleIndex];
  return specialIndices.map((i) => list[i]);
}
