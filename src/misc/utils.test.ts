import { getUnique } from "./utils";

describe("utils", () => {
  describe("getUnique", () => {
    type Item = string | number | undefined | null;
    type Scenario = [Item[], Item[]];
    const scenarios: Scenario[] = [
      [
        ["a", "a", "b", "c", "a", "d", "e", "f", "f", "g", "a"],
        ["a", "b", "c", "d", "e", "f", "g"],
      ],
      [
        [1, 3, 3, 4, 2, 2, 1, 1, 4],
        [1, 3, 4, 2],
      ],
      [
        [1, 3, undefined, 3, "4", 2, null, 1, 1, 4],
        [1, 3, undefined, "4", 2, null, 4],
      ],
    ];

    it("should return an array of unique items for a range of inputs", () => {
      scenarios.forEach(([input, expectedOutput]) => {
        expect(getUnique(input)).toEqual(expectedOutput);
      });
    });
  });
});
