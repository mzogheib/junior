import { FormEvent, useState } from 'react';
import styled from '@emotion/styled';

import EquationTermInput from './EquationTermInput';
import EquationOperatorTile from './EquationOperatorTile';
import {
  Equation,
  EquationComponent,
  EquationComponentType,
  EquationOperatorValue,
} from '../services/equation';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type EquationInputValues = Record<number, string>;

const checkIsComponentValid = (
  equationComponent: EquationComponent,
  value?: string
) => {
  if (equationComponent.type === EquationComponentType.Operator) {
    return true;
  }

  return value?.length === equationComponent.value.toString().length;
};

const checkIsValid = (equation: Equation, values?: EquationInputValues) => {
  if (!values) {
    return false;
  }

  return equation.every((equationComponent, index) =>
    checkIsComponentValid(equationComponent, values[index])
  );
};

const makeAttemptComponent = (
  equationComponent: EquationComponent,
  value: string
): EquationComponent => {
  if (equationComponent.type === EquationComponentType.Operator) {
    return equationComponent;
  }

  return {
    ...equationComponent,
    value,
  };
};

const makeAttempt = (
  equation: Equation,
  values: EquationInputValues
): Equation =>
  equation.map((equationComponent, index) =>
    makeAttemptComponent(equationComponent, values[index])
  );

type Props = {
  equation: Equation;
  onSubmit: (attempt: Equation) => void;
};

const EquationInput = ({ equation, onSubmit }: Props) => {
  const [inputValues, setInputValues] = useState<EquationInputValues>();
  const [focussedInput, setFocussedInput] = useState(0);

  const handleChange = (index: number, value: string) => {
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  };

  const handleFocus = (index: number) => {
    setFocussedInput(index);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValues || !checkIsValid(equation, inputValues)) {
      return;
    }

    onSubmit(makeAttempt(equation, inputValues));
    setInputValues(undefined);
  };

  const renderEquationComponent = (
    { type, value }: EquationComponent,
    index: number
  ) => {
    if (type === EquationComponentType.Term) {
      return (
        <form onSubmit={handleSubmit} key={index}>
          <EquationTermInput
            length={value.length}
            value={inputValues?.[index] ?? ''}
            onChange={(value) => handleChange(index, value)}
            autoFocus={index === 0}
            onFocus={() => handleFocus(index)}
            isFocussed={index === focussedInput}
          />
        </form>
      );
    }

    // TypeScript complains that value could be a string but it clearly cannot
    return (
      <EquationOperatorTile
        value={value as EquationOperatorValue}
        key={index}
      />
    );
  };

  return <Wrapper>{equation.map(renderEquationComponent)}</Wrapper>;
};

export default EquationInput;
