import { $enum } from "ts-enum-util";
import { CardValue, numericCardValue, sortCardValue } from "../card-types";

describe("numericCardValue", () => {
  $enum(CardValue)
    .getValues()
    .forEach((value, index) => {
      const num = index + 1;
      it(`for ${value} => ${num}`, () => {
        expect(numericCardValue(value)).toEqual(num);
      });
    });
});

describe("sortCardValue(a, b)", () => {
  it("sorts by numeric value, where the last are J,Q,K", () => {
    const a = [CardValue.N4, CardValue.Q, CardValue.K, CardValue.J, CardValue.N3, CardValue.N10, CardValue.N1];
    const e = [CardValue.N1, CardValue.N3, CardValue.N4, CardValue.N10, CardValue.J, CardValue.Q, CardValue.K];
    expect([...a].sort(sortCardValue)).toEqual(e);
  });
});
