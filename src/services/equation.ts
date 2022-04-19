import { randomNumberBetween } from "../misc/utils";
import {
  TargetSegments,
  stringifyTargetSegments,
  ReadOnlySegmentValue,
  SegmentType,
} from "./segments";

export const validateEquation = (equationSegments: TargetSegments) => {
  const equationString = stringifyTargetSegments(equationSegments);
  const [expressionString, resultString] = equationString.split(
    ReadOnlySegmentValue.Equals
  );

  // eslint-disable-next-line no-eval
  const evaluatedExpressionString = eval(expressionString).toString();

  const isEqual = evaluatedExpressionString === resultString;

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

export const getRandomEquation = () => {
  const expression: TargetSegments = [
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(1, 9).toString(),
    },
    {
      type: SegmentType.ReadOnly,
      value: getRandomOperator(),
    },
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(1, 9).toString(),
    },
    {
      type: SegmentType.ReadOnly,
      value: getRandomOperator(),
    },
    {
      type: SegmentType.Writeable,
      value: randomNumberBetween(1, 9).toString(),
    },
  ];

  const expressionString = stringifyTargetSegments(expression);
  // This isn't evaluating arbitrary input so should be safe... I think
  // eslint-disable-next-line no-eval
  const result = eval(expressionString).toString();

  const targetSegments: TargetSegments = [
    ...expression,
    {
      type: SegmentType.ReadOnly,
      value: ReadOnlySegmentValue.Equals,
    },
    {
      type: SegmentType.Writeable,
      value: result,
    },
  ];

  return targetSegments;
};
