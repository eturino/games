import { shuffleAndDrawCard } from "../../utils/lists";
import { numericCardValue } from "../cards";
import { buildZasDeck, ZasCardInfo } from "./cards";
import { BetActionType, isBetHigher, isBetLower } from "./consts";

export type RoundState = {
  /**
   * list of cards face down, left to play
   */
  faceDownCards: ZasCardInfo[];

  /**
   * list of cards that have been played. The last played card will be the first element of this array.
   */
  faceUpCards: ZasCardInfo[];

  /**
   * status of the last play
   */
  playStatus: PlayStatus;
};

export enum PlayStatus {
  INITIAL = "INITIAL",
  DRAW = "DRAW",
  LOST = "LOST",
  WON = "WON",
}

/**
 * shuffles a deck of cars (use the given one or builds a new if none given), draws a card face up, and uses status INITIAL
 *
 * @param deck
 */
export function initialRound(deck: ZasCardInfo[] = buildZasDeck()): RoundState {
  const [card, faceDownCards] = shuffleAndDrawCard(deck);
  return {
    playStatus: PlayStatus.INITIAL,
    faceDownCards,
    faceUpCards: [card],
  };
}

/**
 * Number of points in play on each round
 *
 * @param round
 */
export function pointsForRound(round: RoundState): number {
  return round.faceUpCards.length;
}

/**
 * Makes the play: draws a new card and checks it against the previous face-up card.
 * Depending on the given bet, it calculates the new status
 * note: The newly drawn card will be the first of the faceUpCards array
 *
 * @param round
 * @param bet
 */
export function roundPlayBet(round: RoundState, bet: BetActionType): RoundState {
  return roundPlay(round, (input) => nextStatusFor({ ...input, bet }));
}

/**
 * play bet with BET_HIGHER
 * @see roundPlayBet
 * @param round
 */
export function roundPlayBetHigher(round: RoundState): RoundState {
  return roundPlayBet(round, "BET_HIGHER");
}

/**
 * play bet with BET_LOWER
 * @see roundPlayBet
 * @param round
 */
export function roundPlayBetLower(round: RoundState): RoundState {
  return roundPlayBet(round, "BET_LOWER");
}

export function roundMockPlayWin(round: RoundState): RoundState {
  return roundPlay(round, () => PlayStatus.WON);
}

export function roundMockPlayLoose(round: RoundState): RoundState {
  return roundPlay(round, () => PlayStatus.LOST);
}

function roundPlay(round: RoundState, statusFn: (input: StatusFnParams) => PlayStatus): RoundState {
  const prevCard = round.faceUpCards[0];
  const [currentCard, faceDownCards] = shuffleAndDrawCard(round.faceDownCards);
  const betStatus = statusFn({ prevCard, currentCard });
  return {
    ...round,
    playStatus: betStatus,
    faceDownCards,
    faceUpCards: [currentCard, ...round.faceUpCards],
  };
}

type StatusFnParams = { prevCard: ZasCardInfo; currentCard: ZasCardInfo };
type NextStatusForParams = StatusFnParams & { bet: BetActionType };

/**
 * compares the previous card with the current card and returns the new Status, depending on the bet:
 * - if the cards have the same numeric value, status is DRAW
 * - if the new card is higher and the bet was BET_HIGHER, or if it was lower and the bet as BET_LOWER, the status is WON
 * - otherwise the status is LOST
 *
 * @param input.prevCard
 * @param input.currentCard
 * @param input.bet
 */
export function nextStatusFor(input: NextStatusForParams): PlayStatus {
  const prev = numericCardValue(input.prevCard.cardValue);
  const curr = numericCardValue(input.currentCard.cardValue);
  if (prev === curr) return PlayStatus.DRAW;

  return winStatus(() => {
    return curr > prev ? isBetHigher(input.bet) : isBetLower(input.bet);
  });
}

function winStatus(fnForWin: () => boolean): PlayStatus.WON | PlayStatus.LOST {
  return fnForWin() ? PlayStatus.WON : PlayStatus.LOST;
}
