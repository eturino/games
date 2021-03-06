import { InvalidPlayerError } from "../../errors";
import { UserFragment } from "../../lib/graphql/client/fragments/user.graphql";
import { makeGameId } from "../../utils/ids";
import { pickRandomPlayer } from "../../utils/lists";
import { BetActionType } from "./actions";
import { ZasCardInfo } from "./cards";
import { initialRound, PlayStatus, pointsForRound, roundPlayBet, RoundState } from "./round";

export type PlayerCounter = {
  user: UserFragment;
  points: number;
};

export type Game = {
  id: string;
  playerCounters: PlayerCounter[];
  currentRound: RoundState;
  previousRounds: RoundState[];
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
    id: params.id ?? makeGameId(),
    maxPoints: params.maxPoints,
    finished: false,
    playerCounters: params.users.map((user) => ({ user, points: 0 })),
    currentRound: initialRound(),
    currentPlayer,
    previousRounds: [],
    lastPlayer: null,
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

  return {
    ...game,
    currentPlayer: cp.user,
    lastPlayer: game.currentPlayer,
    currentRound: { ...game.currentRound, playStatus: PlayStatus.INITIAL },
  };
}

/**
 * returns a new Game object with:
 *  - the counter of the current player gets a point
 *
 * note: the current player remains unchanged, it is the same player
 * note: returns the same game unchanged if the round has not been draw or if the game is finished
 *
 * @param game
 */
export function treatDraw(game: Game): Game {
  if (game.finished) return game;
  if (game.currentRound.playStatus !== PlayStatus.DRAW) return game;

  return { ...game, playerCounters: addPointsToCurrentCounter(game, 1) };
}

/**
 * returns a new Game object with:
 *  - the points of the current round added to the counter of the current player
 *
 * note: the current player remains unchanged, it is the same player
 * note: returns the same game unchanged if the round has not been lost or if the game is finished
 *
 * @param game
 */
export function treatLost(game: Game): Game {
  if (game.finished) return game;
  if (game.currentRound.playStatus !== PlayStatus.LOST) return game;

  return { ...game, playerCounters: addPointsToCurrentCounter(game, pointsForRound(game.currentRound)) };
}

function addPointsToCurrentCounter(game: Game, extraPoints: number): PlayerCounter[] {
  return game.playerCounters.map((pc) => {
    if (pc.user.id === game.currentPlayer.id) {
      return { ...pc, points: pc.points + extraPoints };
    }

    return pc;
  });
}

export function treatNewRound(game: Game): Game {
  if (game.finished) return game;

  return { ...game, currentRound: initialRound(), previousRounds: [game.currentRound, ...game.previousRounds] };
}

export function currentCard(game: Game): ZasCardInfo {
  return game.currentRound.faceUpCards[0];
}

export function currentStatus(game: Game): PlayStatus {
  return game.currentRound.playStatus;
}
