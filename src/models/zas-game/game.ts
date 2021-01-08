import { InvalidPlayerError } from "../../errors";
import { UserFragment } from "../../lib/graphql/client/fragments/user.graphql";
import { makeGameId } from "../../utils/ids";
import { findPlayerAndRestWith, findPlayerWith, pickRandomPlayer } from "../../utils/lists";
import { BetActionType } from "./consts";
import { initialRound, PlayStatus, pointsForRound, roundPlayBet, RoundState } from "./round";

export type PlayerCounter = {
  user: UserFragment;
  points: number;
};

export type Game = {
  id: string;
  playerCounters: PlayerCounter[];
  currentRound: RoundState;
  lastPlayer: UserFragment | null;
  currentPlayer: UserFragment;
  maxPoints: number;
  finished: boolean;
};

export function gamePlayBet(game: Game, bet: BetActionType): Game {
  const round = roundPlayBet(game.currentRound, bet);
  const newGame = { ...game, currentRound: round };
  if (round.playStatus === PlayStatus.DRAW) {
    return treatDraw(newGame);
  }

  if (round.playStatus === PlayStatus.LOST) {
    return treatLost(newGame);
  }

  return newGame;
}

type InitialGameParams = { users: UserFragment[]; maxPoints: number; id?: string; currentPlayer?: UserFragment };

export function initialGame(params: InitialGameParams): Game {
  const currentPlayer = params.currentPlayer ?? pickRandomPlayer(params.users);
  if (!params.users.some((u) => u.id === currentPlayer.id)) {
    throw new InvalidPlayerError(
      `invalid player with id ${currentPlayer.id} selected: not present in the list of players`
    );
  }

  return {
    finished: false,
    id: params.id ?? makeGameId(),
    playerCounters: params.users.map((user) => ({ user, points: 0 })),
    currentRound: initialRound(),
    lastPlayer: null,
    currentPlayer,
    maxPoints: params.maxPoints,
  };
}

/**
 * changes the Game status with
 *
 * @param game
 * @param playerId
 */
export function chooseNewPlayer(game: Game, playerId: UserFragment["id"]): Game {
  if (game.finished) return game;

  const cp = game.playerCounters.find((x) => x.user.id === playerId);
  if (!cp) throw new InvalidPlayerError(`player ${playerId} not found in game`);

  return { ...game, currentPlayer: cp.user, lastPlayer: game.currentPlayer };
}

/**
 * returns a new Game object with:
 *  - the counter of the current player gets a point
 *  - if the points of the current player is >= the maxPoints it sets finished to true
 *  - otherwise replaces currentRound with a new round.
 *
 * note: the current player remains unchanged, it is the same player
 * note: returns the same game unchanged if the round has not been draw or if the game is finished
 *
 * @param game
 */
export function treatDraw(game: Game): Game {
  if (game.finished) return game;
  if (game.currentRound.playStatus !== PlayStatus.DRAW) return game;

  const [pc, rest] = findPlayerAndRestWith(game.playerCounters, (p) => p.user.id === game.currentPlayer.id);

  const playerCounter = { ...pc, points: pc.points + pointsForRound(game.currentRound) };
  return treatFinished({ ...game, playerCounters: [playerCounter, ...rest] });
}

/**
 * returns a new Game object with:
 *  - the points of the current round added to the counter of the current player
 *  - if the points of the current player is >= the maxPoints it sets finished to true
 *  - otherwise replaces currentRound with a new round.
 *
 * note: the current player remains unchanged, it is the same player
 * note: returns the same game unchanged if the round has not been lost or if the game is finished
 *
 * @param game
 */
export function treatLost(game: Game): Game {
  if (game.finished) return game;
  if (game.currentRound.playStatus !== PlayStatus.LOST) return game;

  const [pc, rest] = findPlayerAndRestWith(game.playerCounters, (p) => p.user.id === game.currentPlayer.id);
  const playerCounter = { ...pc, points: pc.points + pointsForRound(game.currentRound) };

  return treatNewRound(treatFinished({ ...game, playerCounters: [playerCounter, ...rest] }));
}

function treatFinished(game: Game): Game {
  const playerCounter = findPlayerWith(game.playerCounters, (x) => x.user.id === game.currentPlayer.id);
  const finished = playerCounter.points >= game.maxPoints;
  return {
    ...game,
    finished,
  };
}

function treatNewRound(game: Game): Game {
  if (game.finished) return game;

  return { ...game, currentRound: initialRound() };
}
