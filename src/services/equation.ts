import { randomNumberBetween } from '../misc/utils';

export enum EquationComponentType {
  Term = 'term',
  Operator = 'operator',
}

export enum EquationOperatorValue {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Equals = '=',
}

export type EquationTerm = {
  type: EquationComponentType.Term;
  value: string;
};

export type EquationOperator = {
  type: EquationComponentType.Operator;
  value: EquationOperatorValue;
};

export type EquationComponent = EquationTerm | EquationOperator;

export type Equation = EquationComponent[];

export const mapOperatorCharacter = (value: string) => {
  if (value === EquationOperatorValue.Multiply) {
    return 'X';
  }

  return value;
};

export const stringifyEquation = (equationComponents: Equation) =>
  equationComponents.map(({ value }) => mapOperatorCharacter(value)).join('');

export const READ_ONLY_CHARACTERS = Object.values(EquationOperatorValue).map(
  mapOperatorCharacter
);

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

export const getRandomEquation = (): Promise<Equation> => {
  const expression: Equation = [
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

  const expressionString = expression
    .map(({ value }) => value.toString())
    .join('');

  // This isn't evaluation arbitrary input so should be safe... I think
  // eslint-disable-next-line no-eval
  const result = eval(expressionString).toString();

  const equation: Equation = [
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

  return new Promise((resolve) => setTimeout(() => resolve(equation), 1000));
};
