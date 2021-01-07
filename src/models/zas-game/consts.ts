export type BetActionType = "BET_HIGHER" | "BET_LOWER";

export type BetAction = { type: BetActionType; payload: null };
export type AssignAction = { type: "ASSIGN"; payload: { playerID: string } };
export type PlayerAction = BetAction | AssignAction;

export function isBetHigher(x: string): x is "BET_HIGHER" {
  return x === "BET_HIGHER";
}

export function isBetLower(x: string): x is "BET_LOWER" {
  return x === "BET_LOWER";
}

export function isAssignActionType(x: string): x is "ASSIGN" {
  return x === "ASSIGN";
}

export function isAssignAction(x: PlayerAction): x is AssignAction {
  return isAssignActionType(x.type);
}

export function isBetAction(x: PlayerAction): x is BetAction {
  return isBetHigher(x.type) || isBetLower(x.type);
}
