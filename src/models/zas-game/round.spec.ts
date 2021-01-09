import { tail } from "lodash";
import { CardSuit, CardValue, makeCardInfo } from "../cards";
import { buildZasDeck, zasCard } from "./cards";
import { initialRound, nextStatusFor, PlayStatus, pointsForRound, roundPlayBet } from "./round";

describe("initialRound()", () => {
  it("init", () => {
    const deck = buildZasDeck();
    const a = initialRound(deck);
    expect(a.playStatus).toEqual(PlayStatus.INITIAL);
    expect(a.faceUpCards.length).toEqual(1);
    expect(a.faceDownCards.length).toEqual(51);
  });
});

describe("pointsForRound", () => {
  it("one point per face up cards", () => {
    expect(pointsForRound(initialRound())).toEqual(1);

    const r = roundPlayBet(initialRound(), "BET_HIGHER");
    expect(pointsForRound(r)).toEqual(2);
  });
});

describe("nextStatusFor()", () => {
  describe("given 2 cards of the same value", () => {
    const currentCard = zasCard(makeCardInfo(CardSuit.Hearts, CardValue.N3));
    const prevCard = zasCard(makeCardInfo(CardSuit.Clubs, CardValue.N3));

    it("with bet higher: draw", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_HIGHER" })).toEqual(PlayStatus.DRAW);
    });
    it("with bet lower: draw", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_LOWER" })).toEqual(PlayStatus.DRAW);
    });
  });

  describe("new card is higher", () => {
    const currentCard = zasCard(makeCardInfo(CardSuit.Hearts, CardValue.N5));
    const prevCard = zasCard(makeCardInfo(CardSuit.Clubs, CardValue.N3));

    it("with bet higher: won", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_HIGHER" })).toEqual(PlayStatus.WON);
    });
    it("with bet lower: lost", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_LOWER" })).toEqual(PlayStatus.LOST);
    });
  });

  describe("new card is lower", () => {
    const currentCard = zasCard(makeCardInfo(CardSuit.Hearts, CardValue.N2));
    const prevCard = zasCard(makeCardInfo(CardSuit.Clubs, CardValue.N3));

    it("with bet higher: lost", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_HIGHER" })).toEqual(PlayStatus.LOST);
    });
    it("with bet lower: won", () => {
      expect(nextStatusFor({ currentCard, prevCard, bet: "BET_LOWER" })).toEqual(PlayStatus.WON);
    });
  });
});

describe("playBet()", () => {
  it("draws a card and gets the new status", () => {
    const round = initialRound();
    const a = roundPlayBet(round, "BET_HIGHER");
    expect(a).not.toBe(round);
    expect(a.faceDownCards.length).toEqual(round.faceDownCards.length - 1);
    expect(tail(a.faceUpCards)).toEqual(round.faceUpCards);
  });
});
