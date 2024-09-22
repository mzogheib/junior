import {
  getUniqueSegmentValueChars,
  SegmentType,
  TargetSegments,
} from "services/segments";

describe("segments", () => {
  describe("getUniqueSegmentValueChars", () => {
    type Scenario = [TargetSegments, string[]];
    const scenarios: Scenario[] = [
      [
        [
          { type: SegmentType.Writeable, value: "a" },
          { type: SegmentType.Writeable, value: "a" },
          { type: SegmentType.Writeable, value: "b" },
          { type: SegmentType.Writeable, value: "c" },
          { type: SegmentType.Writeable, value: "d" },
          { type: SegmentType.Writeable, value: "c" },
          { type: SegmentType.Writeable, value: "c" },
          { type: SegmentType.Writeable, value: "a" },
          { type: SegmentType.Writeable, value: "d" },
          { type: SegmentType.Writeable, value: "a" },
          { type: SegmentType.Writeable, value: "c" },
        ],
        ["a", "b", "c", "d"],
      ],
      [
        [
          { type: SegmentType.Writeable, value: "11" },
          { type: SegmentType.Writeable, value: "35" },
          { type: SegmentType.Writeable, value: "55" },
          { type: SegmentType.Writeable, value: "12" },
          { type: SegmentType.Writeable, value: "3" },
          { type: SegmentType.Writeable, value: "55" },
          { type: SegmentType.Writeable, value: "32" },
        ],
        ["1", "3", "5", "2"],
      ],
    ];

    it("should return an array of unique values for an array of segments", () => {
      scenarios.forEach(([input, expectedOutput]) => {
        expect(getUniqueSegmentValueChars(input)).toEqual(expectedOutput);
      });
    });
  });
});
