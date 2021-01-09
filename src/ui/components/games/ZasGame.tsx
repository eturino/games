import React, { FunctionComponent, useState } from "react";
import { UserFragment } from "../../../lib/graphql/client/fragments/user.graphql";
import { keyForCardInfo } from "../../../models/cards";
import { initialGame } from "../../../models/zas-game/game";
import { GameRunner } from "../../../models/zas-game/runner";
import { makeUserId } from "../../../utils/ids";
import { Card } from "../cards/Card";

const makeUser = (): UserFragment => {
  const id = makeUserId();
  return { id, name: `Some User ${id}` };
};

export const ZasGame: FunctionComponent<{ runner: GameRunner }> = ({ runner }) => {
  const [game, setGame] = useState(runner.game);

  const onBetHigher = () => setGame(runner.act({ type: "BET_HIGHER", payload: null }));
  const onBetLower = () => setGame(runner.act({ type: "BET_LOWER", payload: null }));

  return (
    <div>
      <header>game: {game.id}</header>
      {game.finished ? (
        <header>FINISHED</header>
      ) : (
        <header>
          <button onClick={onBetHigher}>BET HIGHER</button>
          <button onClick={onBetLower}>BET LOWER</button>
          completed rounds: {game.previousRounds.length}
        </header>
      )}

      <div>
        <h2>Cards in stack: {game.currentRound.faceUpCards.length}</h2>
        {game.currentRound.faceUpCards.map((card) => (
          <Card key={keyForCardInfo(card)} faceUp={true} cardValue={card.cardValue} cardSuit={card.cardSuit} />
        ))}
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
};

const maxPoints = 20;
const users = [makeUser(), makeUser()];

export const ZasGameContainer: FunctionComponent = () => {
  const [runner] = useState(new GameRunner(initialGame({ users, maxPoints })));
  return <ZasGame runner={runner} />;
};
