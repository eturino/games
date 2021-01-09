import React, { FunctionComponent, useState } from "react";
import { Avatar, Button } from "theme-ui";
import { keyForCardInfo } from "../../../../models/cards";
import { ZasCardInfo } from "../../../../models/zas-game/cards";
import { Game, PlayerCounter } from "../../../../models/zas-game/game";
import { PlayStatus } from "../../../../models/zas-game/round";
import { GameRunner } from "../../../../models/zas-game/runner";
import { Card } from "../../cards/Card";

const ZasCard: FunctionComponent<{ card: ZasCardInfo }> = ({ card }) => {
  // TODO: special cards
  return (
    <Card
      key={keyForCardInfo(card)}
      faceUp={true}
      cardValue={card.cardValue}
      cardSuit={card.cardSuit}
      special={card.special}
      sx={{
        border: "10px solid",
      }}
    />
  );
};

const ZasCounter: FunctionComponent<{ playerCounter: PlayerCounter }> = ({ playerCounter }) => {
  return (
    <div>
      <header>
        {playerCounter.user.picture ? <Avatar src={playerCounter.user.picture} /> : playerCounter.user.name}
      </header>
      <h4>{playerCounter.points}</h4>
    </div>
  );
};

const ZasUsers: FunctionComponent<{ game: Game }> = ({ game }) => {
  return (
    <header>
      {game.playerCounters.map((pc) => (
        <ZasCounter key={pc.user.id} playerCounter={pc} />
      ))}
    </header>
  );
};

export const ZasGame: FunctionComponent<{ runner: GameRunner }> = ({ runner }) => {
  const [game, setGame] = useState(runner.game);

  const onBetHigher = () => setGame(runner.act({ type: "BET_HIGHER", payload: null }));
  const onBetLower = () => setGame(runner.act({ type: "BET_LOWER", payload: null }));
  const onNextRound = () => setGame(runner.act({ type: "START_NEW_ROUND", payload: null }));

  return (
    <div>
      <h2>
        {game.id} ({game.previousRounds.length} completed rounds)
      </h2>

      <ZasUsers game={game} />

      {game.finished ? (
        <header>FINISHED</header>
      ) : game.currentRound.playStatus === PlayStatus.LOST ? (
        <header>
          <Button onClick={onNextRound}>NEXT ROUND</Button>
        </header>
      ) : (
        <header>
          <Button onClick={onBetHigher}>BET HIGHER</Button> <Button onClick={onBetLower}>BET LOWER</Button>
        </header>
      )}

      <div>
        <h2>Cards in stack: {game.currentRound.faceUpCards.length}</h2>
        {game.currentRound.faceUpCards.map((card) => (
          <ZasCard key={keyForCardInfo(card)} card={card} />
        ))}
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
};
