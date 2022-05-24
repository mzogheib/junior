import { GameDifficulty } from "components/Game/types";
import { randomNumberBetween } from "misc/utils";
import {
  TargetSegments,
  stringifyTargetSegments,
  ReadOnlySegmentValue,
  SegmentType,
} from "services/segments";

const evaluateExpression = (expressionString: string) =>
  // This isn't evaluating arbitrary input so should be safe... I think
  // eslint-disable-next-line no-eval
  eval(expressionString).toString();

export const validateEquation = (equationSegments: TargetSegments) => {
  const equationString = stringifyTargetSegments(equationSegments);
  const [expressionString, resultString] = equationString.split(
    ReadOnlySegmentValue.Equals
  );

  const isEqual = evaluateExpression(expressionString) === resultString;

  if (!isEqual) {
    return "Invalid equation";
  }
};

const getRandomOperator = () => {
  const values = Object.values(ReadOnlySegmentValue).filter(
    (value) =>
      // Exclude for now
      ![ReadOnlySegmentValue.Subtract, ReadOnlySegmentValue.Equals].includes(
        value
      )
  );
  const index = randomNumberBetween(0, values.length - 1);
  return values[index];
};

export const getRandomEquation = (
  difficulty: GameDifficulty = GameDifficulty.Easy
) => {
  const termMin = difficulty === GameDifficulty.Easy ? 1 : 10;
  const termMax = difficulty === GameDifficulty.Easy ? 9 : 99;

  const expression: TargetSegments = [
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(termMin, termMax).toString(),
    },
    {
      type: SegmentType.ReadOnly,
      value: getRandomOperator(),
    },
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(termMin, termMax).toString(),
    },
    {
      type: SegmentType.ReadOnly,
      value: getRandomOperator(),
    },
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(termMin, termMax).toString(),
    },
  ];

  const expressionString = stringifyTargetSegments(expression);

  const targetSegments: TargetSegments = [
    ...expression,
    {
      type: SegmentType.ReadOnly,
      value: ReadOnlySegmentValue.Equals,
    },
    {
      type: SegmentType.Writeable,
      value: evaluateExpression(expressionString),
    },
  ];

  return targetSegments;
};
