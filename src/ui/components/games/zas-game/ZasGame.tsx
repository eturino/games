import React, { FunctionComponent, useState } from "react";
import { Avatar, Box, Button, Card as VisualCard, Flex, Text } from "theme-ui";
import { keyForCardInfo } from "../../../../models/cards";
import { allowedActionTypes } from "../../../../models/zas-game/actions";
import { ZasCardInfo } from "../../../../models/zas-game/cards";
import { Game, PlayerCounter } from "../../../../models/zas-game/game";
import { GameRunner } from "../../../../models/zas-game/runner";
import { Card } from "../../cards/Card";

const ZasCard: FunctionComponent<{ card: ZasCardInfo }> = ({ card }) => {
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

const ZasCounter: FunctionComponent<{
  playerCounter: PlayerCounter;
  onAssign?: (pid: string) => void;
  isCurrent: boolean;
}> = ({ playerCounter, isCurrent, onAssign }) => {
  const onClick = () => onAssign && onAssign(playerCounter.user.id);
  const borderSX = isCurrent ? { border: "5px blue solid" } : onAssign ? { border: "5px red solid" } : {};

  return (
    <Box sx={{ maxWidth: 256 }}>
      <VisualCard onClick={onClick} sx={borderSX}>
        <header>
          {playerCounter.user.picture ? (
            <Avatar src={playerCounter.user.picture} />
          ) : (
            <Text>{playerCounter.user.name}</Text>
          )}
        </header>
        <Text>{playerCounter.points}</Text>
      </VisualCard>
    </Box>
  );
};

const ZasUsers: FunctionComponent<{ game: Game; onAssign?: (pid: string) => void }> = ({ game, onAssign }) => {
  const currentPlayerId = game.currentPlayer.id;
  return (
    <Flex>
      {game.playerCounters.map((pc) => {
        const isCurrent = pc.user.id === currentPlayerId;
        return (
          <ZasCounter
            key={pc.user.id}
            playerCounter={pc}
            isCurrent={isCurrent}
            onAssign={isCurrent ? undefined : onAssign}
          />
        );
      })}
    </Flex>
  );
};

export const ZasGame: FunctionComponent<{ runner: GameRunner }> = ({ runner }) => {
  const [game, setGame] = useState(runner.game);
  const allowed = allowedActionTypes(game);
  console.log({ allowed });

  const onBetHigher = () => setGame(runner.act({ type: "BET_HIGHER", payload: null }));
  const onBetLower = () => setGame(runner.act({ type: "BET_LOWER", payload: null }));
  const onNextRound = () => setGame(runner.act({ type: "START_NEW_ROUND", payload: null }));
  const onAssign = (playerID: string) => setGame(runner.act({ type: "ASSIGN", payload: { playerID } }));

  return (
    <div>
      <h2>
        {game.id} ({game.previousRounds.length} completed rounds) {game.finished ? "(FINISHED)" : null}
      </h2>

      <ZasUsers game={game} onAssign={allowed.includes("ASSIGN") ? onAssign : undefined} />

      <header>
        <Button onClick={onNextRound} disabled={!allowed.includes("START_NEW_ROUND")}>
          NEXT ROUND
        </Button>{" "}
        <Button onClick={onBetHigher} disabled={!allowed.includes("BET_HIGHER")}>
          BET HIGHER
        </Button>{" "}
        <Button onClick={onBetLower} disabled={!allowed.includes("BET_LOWER")}>
          BET LOWER
        </Button>
      </header>

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
