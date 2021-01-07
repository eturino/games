import { drop, filter, find, isUndefined, sample, shuffle } from "lodash";
import { Class } from "utility-types";
import { NotEnoughCardsError, NotEnoughPlayersError } from "../errors";

function makeShuffleAndDraw(errorClass: Class<Error> = Error) {
  return function shuffleAndDraw<T>(list: T[]): [T, T[]] {
    if (list.length < 1) throw new errorClass();

    const shuffled = shuffle(list);
    const x = shuffled[0];
    const left = drop(shuffled, 1);
    return [x, left];
  };
}

export const shuffleAndDrawCard = makeShuffleAndDraw(NotEnoughCardsError);
export const shuffleAndDrawPlayer = makeShuffleAndDraw(NotEnoughPlayersError);

function makeFindAndRestWith(errorClass: Class<Error> = Error) {
  return function findAndRestWith<T>(list: T[], fn: (x: T) => boolean): [T, T[]] {
    const x = find(list, fn);
    if (isUndefined(x)) throw new errorClass();

    const rest = filter(list, (x) => !fn(x));
    return [x, rest];
  };
}

export const findCardAndRestWith = makeFindAndRestWith(NotEnoughCardsError);
export const findPlayerAndRestWith = makeFindAndRestWith(NotEnoughPlayersError);

function makeFindWith(errorClass: Class<Error> = Error) {
  return function findWith<T>(list: T[], fn: (x: T) => boolean): T {
    const x = find(list, fn);
    if (isUndefined(x)) throw new errorClass();

    return x;
  };
}

export const findCardWith = makeFindWith(NotEnoughCardsError);
export const findPlayerWith = makeFindWith(NotEnoughPlayersError);

function makePickRandom(errorClass: Class<Error> = Error) {
  return function pickRandom<T>(list: T[]): T {
    const s = sample(list);

    if (isUndefined(s)) throw new errorClass();
    return s;
  };
}

export const pickRandomCard = makePickRandom(NotEnoughCardsError);
export const pickRandomPlayer = makePickRandom(NotEnoughPlayersError);
