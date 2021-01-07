export class InvalidPlayerError extends Error {}
export class InvalidActionError extends Error {}

export class NotEnoughElementsError extends Error {}
export class NotEnoughCardsError extends NotEnoughElementsError {}
export class NotEnoughPlayersError extends NotEnoughElementsError {}
