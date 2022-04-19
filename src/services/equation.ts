import { randomNumberBetween } from "../misc/utils";

export enum EquationComponentType {
  Term = "term",
  Operator = "operator",
}

export enum EquationOperatorValue {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Equals = "=",
}

type EquationTerm = {
  type: EquationComponentType.Term;
  value: string;
};

type EquationOperator = {
  type: EquationComponentType.Operator;
  value: EquationOperatorValue;
};

export type TargetSegment = EquationTerm | EquationOperator;

export type TargetSegments = TargetSegment[];

export const isEquationTerm = ({ type }: TargetSegment) =>
  type === EquationComponentType.Term;

export const stringifyEquation = (targetSegments: TargetSegments) =>
  targetSegments.map(({ value }) => value).join("");

export const READ_ONLY_CHARACTERS = Object.values(EquationOperatorValue).map(
  String
);

export const CHARACTER_DISPLAY_MAP = {
  [EquationOperatorValue.Multiply.toString()]: "X",
};

export const isValidEquation = (targetSegments: TargetSegments) => {
  const target = stringifyEquation(targetSegments);
  const [expressionString, resultString] = target.split(
    EquationOperatorValue.Equals
  );

  // eslint-disable-next-line no-eval
  const evaluatedExpressionString = eval(expressionString).toString();

  return evaluatedExpressionString === resultString;
};

const getRandomOperator = () => {
  const values = Object.values(EquationOperatorValue).filter(
    (value) =>
      // Exclude for now
      ![EquationOperatorValue.Subtract, EquationOperatorValue.Equals].includes(
        value
      )
  );
  const index = randomNumberBetween(0, values.length - 1);
  return values[index];
};

export const getRandomEquation = (): Promise<TargetSegments> => {
  const expression: TargetSegments = [
    {
      type: EquationComponentType.Term,
      value: randomNumberBetween(1, 9).toString(),
    },
    {
      type: EquationComponentType.Operator,
      value: getRandomOperator(),
    },
    {
      type: EquationComponentType.Term,
      value: randomNumberBetween(1, 9).toString(),
    },
    {
      type: EquationComponentType.Operator,
      value: getRandomOperator(),
    },
    {
      type: EquationComponentType.Term,
      value: randomNumberBetween(1, 9).toString(),
    },
  ];

  const expressionString = stringifyEquation(expression);
  // This isn't evaluating arbitrary input so should be safe... I think
  // eslint-disable-next-line no-eval
  const result = eval(expressionString).toString();

  const targetSegments: TargetSegments = [
    ...expression,
    {
      type: EquationComponentType.Operator,
      value: EquationOperatorValue.Equals,
    },
    {
      type: EquationComponentType.Term,
      value: result,
    },
  ];

  return new Promise((resolve) =>
    setTimeout(() => resolve(targetSegments), 125)
  );
};
