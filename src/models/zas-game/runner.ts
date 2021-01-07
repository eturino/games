import { isBetAction, PlayerAction } from "./consts";
import { chooseNewPlayer, Game, gamePlayBet } from "./game";

export class GameRunner {
  protected _game: Game;
  protected history: Game[] = [];

  constructor(initialGame: Game) {
    this._game = initialGame;
  }

  get game() {
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

    return chooseNewPlayer(this._game, action.payload.playerID);
  }
}
