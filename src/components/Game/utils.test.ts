import { makeDuration } from "./utils";

describe("utils", () => {
  describe("makeDuration", () => {
    describe("bad input", () => {
      const scenarios = [
        ["", ""],
        ["2022-04-25T00:17:03.499Z", ""],
        ["", "2022-04-25T00:17:03.499Z"],
        ["2022-04-25T00:17:00.000Z", "2022-04-25T00:15:00.000Z"], // startedAt before finishedAt
        ["not an ISO date string", "also not an ISO date string"],
      ];

      test.each(scenarios)(
        'should return undefined for startedAt: "%s" and finishedAt: "%s"',
        (startedAt, finishedAt) => {
          expect(makeDuration(startedAt, finishedAt)).toEqual(undefined);
        }
      );
    });

    describe("good input", () => {
      const scenarios = [
        ["in 45s", "2022-04-25T00:17:00.000Z", "2022-04-25T00:17:45.000Z"],
        ["in 59s", "2022-04-24T00:13:00.023Z", "2022-04-24T00:13:59.233Z"],
        [
          "in 2m and 31s",
          "2022-01-20T00:10:00.000Z",
          "2022-01-20T00:12:31.000Z",
        ],
        [
          "and you took way too long",
          "2022-04-25T00:17:00.000Z",
          "2022-04-25T00:27:00.000Z",
        ],
        [
          "and you took way too long",
          "2022-04-25T00:17:00.000Z",
          "2022-04-28T00:27:00.000Z",
        ],
      ];

      test.each(scenarios)(
        'should return "%s" for startedAt: "%s" and finishedAt: "%s"',
        (expectedOutput, startedAt, finishedAt) => {
          expect(makeDuration(startedAt, finishedAt)).toEqual(expectedOutput);
        }
      );
    });
  });
});
