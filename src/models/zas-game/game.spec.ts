import { UserFragment } from "../../lib/graphql/client/fragments/user.graphql";
import { makeGameId, makeUserId } from "../../utils/ids";
import { initialGame } from "./game";
import { PlayStatus } from "./round";

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
