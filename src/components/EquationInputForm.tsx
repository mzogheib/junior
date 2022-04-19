import {
  Equation,
  EquationComponentType,
  EQUATION_CHARACTER_MAP,
  isEquationTerm,
  isValidEquation,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import InvisibleInputForm from "./InvisibleInputForm";
import InputTiles, { InputTile } from "./InputTiles";
import Tile, { TileSize, TileState } from "./Tile";

const getStartEnd = (eqValue: string, eqCompIndex: number) => {
  const start = eqCompIndex / 2;
  const end = start + eqValue.length;

  return [start, end];
};

const getValueForTerm = (
  value: string,
  eqValue: string,
  eqCompIndex: number
) => {
  const [start, end] = getStartEnd(eqValue, eqCompIndex);
  return value.slice(start, end);
};

type Props = {
  equation: Equation;
  onSubmit: (attempt: string) => void;
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
        value: getValueForTerm(value, eqComp.value, eqCompIndex),
      };
    });

  const handleSubmit = (value: string) =>
    onSubmit(stringifyEquation(makeAttempt(value)));

  const handleValidate = (value: string) => {
    if (!isValidEquation(makeAttempt(value))) {
      onError("Invalid equation");
      return false;
    }

    return true;
  };

  const termsString = equation
    .filter(isEquationTerm)
    .map(({ value }) => value)
    .join("");

  return (
    <InvisibleInputForm
      mode="numbers"
      length={termsString.length}
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      renderInput={(value, onClick) => (
        <InputTiles onClick={onClick}>
          {equation.map(({ value: eqValue }, eqCompIndex) => {
            if (READ_ONLY_CHARACTERS.includes(eqValue)) {
              return (
                <Tile
                  key={eqCompIndex}
                  size={TileSize.Small}
                  state={TileState.ReadOnly}
                  value={EQUATION_CHARACTER_MAP[eqValue] ?? eqValue}
                />
              );
            }

            const [start] = getStartEnd(eqValue, eqCompIndex);
            const slicedValue = getValueForTerm(value, eqValue, eqCompIndex);

            return eqValue.split("").map((_, eqValueIndex) => {
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
