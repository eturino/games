import { isNil } from "lodash";
import { MAX_VALUE, MIN_VALUE } from "./cards";
import { currentCard, currentStatus, Game } from "./game";
import { PlayStatus } from "./round";

export type BetActionType = "BET_HIGHER" | "BET_LOWER";
export type AssignActionType = "ASSIGN";
export type NewRoundActionType = "START_NEW_ROUND";

export type PlayerActionTypes = NewRoundActionType | BetActionType | AssignActionType;

export type BetAction = { type: BetActionType; payload: null };
export type AssignAction = { type: AssignActionType; payload: { playerID: string } };
export type NewRoundAction = { type: NewRoundActionType; payload: null };
export type PlayerAction = NewRoundAction | BetAction | AssignAction;

export function isBetHigher(x: string): x is "BET_HIGHER" {
  return x === "BET_HIGHER";
}

export function isBetLower(x: string): x is "BET_LOWER" {
  return x === "BET_LOWER";
}

export function isAssign(x: string): x is "ASSIGN" {
  return x === "ASSIGN";
}

export function isStartNewRound(x: string): x is "START_NEW_ROUND" {
  return x === "START_NEW_ROUND";
}

export function isAssignAction(x: PlayerAction): x is AssignAction {
  return isAssign(x.type) && !isNil(x?.payload?.playerID);
}

export function isStartNewRoundAction(x: PlayerAction): x is NewRoundAction {
  return isStartNewRound(x.type);
}

export function isBetAction(x: PlayerAction): x is BetAction {
  return isBetHigher(x.type) || isBetLower(x.type);
}

export function allowedActionTypes(game: Game): PlayerActionTypes[] {
  const list: PlayerActionTypes[] = [];

  if (canAssign(game)) list.push("ASSIGN");
  if (canStartNewRound(game)) list.push("START_NEW_ROUND");
  if (canBetLower(game)) list.push("BET_LOWER");
  if (canBetHigher(game)) list.push("BET_HIGHER");

  return list;
}

export function canAssign(game: Game): boolean {
  return !game.finished && currentStatus(game) === PlayStatus.WON && !currentCard(game).special;
}

export function canStartNewRound(game: Game): boolean {
  return !game.finished && currentStatus(game) === PlayStatus.LOST;
}

export function canBetHigher(game: Game): boolean {
  return !game.finished && currentStatus(game) !== PlayStatus.LOST && currentCard(game).cardValue !== MAX_VALUE;
}

export function canBetLower(game: Game): boolean {
  return !game.finished && currentStatus(game) !== PlayStatus.LOST && currentCard(game).cardValue !== MIN_VALUE;
}
