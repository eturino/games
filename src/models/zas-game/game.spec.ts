import { UserFragment } from "../../../lib/graphql/client/fragments/user.graphql";
import { makeGameId, makeUserId } from "../../utils/ids";
import { initialGame, treatLost } from "./game";
import { PlayStatus, roundMockPlayLoose, roundMockPlayWin } from "./round";

const makeUser = (): UserFragment => {
  const id = makeUserId();
  return { id, name: `Some User ${id}` };
};

describe("initialGame()", () => {
  it("init", () => {
    const users: UserFragment[] = [makeUser(), makeUser()];
    const id = makeGameId();
    const game = initialGame({ users, maxPoints: 10, id });
    expect(game.id).toEqual(id);
    expect(game.maxPoints).toEqual(10);
    expect(game.playerCounters).toEqual(users.map((user) => ({ user, points: 0 })));
    expect(game.lastPlayer).toBeFalsy();
    expect(game.currentRound.faceDownCards.length).toEqual(51);
    expect(game.currentRound.faceUpCards.length).toEqual(1);
    expect(game.currentRound.playStatus).toEqual(PlayStatus.INITIAL);
  });
});

describe("treatLost()", () => {
  it("with a finished game: returns the same game", () => {
    const users: UserFragment[] = [makeUser(), makeUser()];
    const id = makeGameId();
    const game = initialGame({ users, maxPoints: 10, id });
    game.finished = true;
    game.currentRound.playStatus = PlayStatus.LOST;

    const a = treatLost(game);
    expect(a).toBe(game);
  });

  it("unfinished game, non lost current round: returns the same game", () => {
    const users: UserFragment[] = [makeUser(), makeUser()];
    const id = makeGameId();
    const game = initialGame({ users, maxPoints: 10, id });
    game.finished = false;
    game.currentRound.playStatus = PlayStatus.WON;

    const a = treatLost(game);
    expect(a).toBe(game);
  });

  it("unfinished game, lost current round, not enough points in total: returns the same game", () => {
    const users: UserFragment[] = [makeUser(), makeUser()];
    const currentPlayer = users[0];
    const id = makeGameId();
    const game = initialGame({ users, maxPoints: 10, id, currentPlayer });
    game.finished = false;
    game.playerCounters.forEach((x) => (x.points = 2));

    game.currentRound = roundMockPlayLoose(roundMockPlayWin(roundMockPlayWin(game.currentRound)));

    const a = treatLost(game);
    expect(a).not.toBe(game);

    expect(a.finished).toBeFalsy();
  });
});
