import { isAssignAction, isBetAction, PlayerAction } from "./consts";
import { chooseNewPlayer, Game, gamePlayBet, treatNewRound } from "./game";

export class GameRunner {
  protected _game: Game;
  protected history: Game[] = [];

  constructor(initialGame: Game) {
    this._game = initialGame;
  }

  get game(): Game {
    return this._game;
  }

  act(action: PlayerAction): Game {
    const game = this.treatAction(action);
    this.history = [this._game, ...this.history];
    this._game = game;
    return game;
  }

  protected treatAction(action: PlayerAction): Game {
    if (isBetAction(action)) {
      return gamePlayBet(this._game, action.type);
    }

    if (isAssignAction(action)) {
      return chooseNewPlayer(this._game, action.payload.playerID);
    }

    return treatNewRound(this._game);
  }
}
