import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

import EquationOperatorTile from './EquationOperatorTile';
import {
  Equation,
  EquationComponentType,
  EquationOperatorValue,
  isEquationTerm,
} from '../services/equation';
import InvisibleInputForm from './InvisibleInputForm';

const InputTiles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getBorderColor = (isFocussed: boolean, theme: Theme) => {
  const focussedConfig = {
    light: 'black',
    dark: 'white',
  };

  return isFocussed ? focussedConfig[theme.palette.mode] : 'gray';
};

const InputTile = styled.div<{ isFocussed: boolean }>`
  width: 36px;
  height: 36px;
  border: 1px ${({ isFocussed, theme }) => getBorderColor(isFocussed, theme)}
    solid;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: 0 2px;
  color: ${({ theme }) => (theme.palette.mode === 'light' ? 'black' : 'white')};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  equation: Equation;
  onSubmit: (attempt: Equation) => void;
};

const EquationInput = ({ equation, onSubmit }: Props) => {
  const handleSubmit = (value: string) => {
    const attemptedEquation = equation.map((eqComp, eqCompIndex) => {
      if (eqComp.type === EquationComponentType.Operator) {
        return eqComp;
      }

      const getStartEnd = () => {
        switch (eqCompIndex) {
          case 0:
            return [0, 1];
          case 2:
            return [1, 2];
          case 4:
            return [2, 3];
          case 6:
          default:
            return [3];
        }
      };
      const [start, end] = getStartEnd();
      const slicedValue = value.slice(start, end);

      return {
        ...eqComp,
        value: slicedValue,
      };
    });

    onSubmit(attemptedEquation);
  };

  const termsString = equation
    .filter(isEquationTerm)
    .map(({ value }) => value)
    .join('');

  return (
    <InvisibleInputForm
      mode="numbers"
      length={termsString.length}
      onSubmit={handleSubmit}
      renderInput={(value, onClick) => (
        <InputTiles onClick={onClick}>
          {equation.map(({ value: eqValue, type }, eqCompIndex) => {
            if (type === EquationComponentType.Operator) {
              return (
                <EquationOperatorTile
                  // TypeScript complains that value could be a string but it clearly cannot
                  value={eqValue as EquationOperatorValue}
                  key={eqCompIndex}
                />
              );
            }

            const getStartEnd = () => {
              switch (eqCompIndex) {
                case 0:
                  return [0, 1];
                case 2:
                  return [1, 2];
                case 4:
                  return [2, 3];
                case 6:
                default:
                  return [3];
              }
            };
            const [start, end] = getStartEnd();
            const slicedValue = value.slice(start, end);

            return eqValue.split('').map((_, eqValueIndex) => {
              return (
                <InputTile
                  key={eqCompIndex + eqValueIndex}
                  isFocussed={start + eqValueIndex === value.length}
                >
                  {slicedValue[eqValueIndex]}
                </InputTile>
              );
            });
          })}
        </InputTiles>
      )}
    />
  );
};

export default EquationInput;
