import { makeGameId } from "./ids";

describe("makeGameId()", () => {
  it("generates different ids", () => {
    const a = makeGameId();
    const b = makeGameId();
    const c = makeGameId();
    expect(a).not.toEqual(b);
    expect(a).not.toEqual(c);
    expect(b).not.toEqual(c);
  });
});
