import EquationOperatorTile from './EquationOperatorTile';
import {
  Equation,
  EquationComponentType,
  EquationOperatorValue,
  isEquationTerm,
} from '../services/equation';
import InvisibleInputForm from './InvisibleInputForm';
import InputTiles, { InputTile } from './InputTiles';
import { TileSize } from './Tile';

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

export default EquationInput;
