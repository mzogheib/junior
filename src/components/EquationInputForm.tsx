import EquationOperatorTile from './EquationOperatorTile';
import {
  Equation,
  EquationComponentType,
  EquationOperatorValue,
  isEquationTerm,
  isValidEquation,
} from '../services/equation';
import InvisibleInputForm from './InvisibleInputForm';
import InputTiles, { InputTile } from './InputTiles';
import { TileSize } from './Tile';

const getStartEnd = (eqCompIndex: number) => {
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

const getValueForTerm = (value: string, eqCompIndex: number) => {
  const [start, end] = getStartEnd(eqCompIndex);
  return value.slice(start, end);
};

type Props = {
  equation: Equation;
  onSubmit: (attempt: Equation) => void;
  onError: (error: string) => void;
};

const EquationInputForm = ({ equation, onSubmit, onError }: Props) => {
  const makeAttempt = (value: string) =>
    equation.map((eqComp, eqCompIndex) => {
      if (eqComp.type === EquationComponentType.Operator) {
        return eqComp;
      }

      return {
        ...eqComp,
        value: getValueForTerm(value, eqCompIndex),
      };
    });

  const handleSubmit = (value: string) => onSubmit(makeAttempt(value));

  const handleValidate = (value: string) => {
    if (!isValidEquation(makeAttempt(value))) {
      onError('Invalid equation');
      return false;
    }

    return true;
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
      onValidate={handleValidate}
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

            const [start] = getStartEnd(eqCompIndex);
            const slicedValue = getValueForTerm(value, eqCompIndex);

            return eqValue.split('').map((_, eqValueIndex) => {
              return (
                <InputTile
                  key={eqCompIndex + eqValueIndex}
                  isFocussed={start + eqValueIndex === value.length}
                  size={TileSize.Small}
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

export default EquationInputForm;
