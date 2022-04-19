import {
  Equation,
  EquationComponentType,
  EQUATION_CHARACTER_MAP,
  isEquationTerm,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import InvisibleInputForm from "./InvisibleInputForm";
import InputTiles, { InputTile } from "./InputTiles";
import Tile, { TileSize, TileState } from "./Tile";

const getStartEnd = (equation: Equation, eqCompIndex: number) => {
  const prevTerms = equation.slice(0, eqCompIndex).filter(isEquationTerm);
  const prevTermsString = stringifyEquation(prevTerms);
  const prevTermsLength = prevTermsString.length;
  const termLength = equation[eqCompIndex].value.length;

  return [prevTermsLength, prevTermsLength + termLength];
};

const getValueForTerm = (
  value: string,
  equation: Equation,
  eqCompIndex: number
) => {
  const [start, end] = getStartEnd(equation, eqCompIndex);
  return value.slice(start, end);
};

type Props = {
  mode: "letters" | "numbers";
  size?: TileSize;
  equation: Equation;
  onSubmit: (attempt: string) => void;
  onValidate: (eqution: Equation) => boolean;
};

const EquationInputForm = ({
  mode,
  size,
  equation,
  onSubmit,
  onValidate,
}: Props) => {
  const makeAttempt = (value: string) =>
    equation.map((eqComp, eqCompIndex) => {
      if (eqComp.type === EquationComponentType.Operator) {
        return eqComp;
      }

      return {
        ...eqComp,
        value: getValueForTerm(value, equation, eqCompIndex),
      };
    });

  const handleSubmit = (value: string) =>
    onSubmit(stringifyEquation(makeAttempt(value)));

  const handleValidate = (value: string) => onValidate(makeAttempt(value));

  const termsString = equation
    .filter(isEquationTerm)
    .map(({ value }) => value)
    .join("");

  return (
    <InvisibleInputForm
      mode={mode}
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
                  size={size}
                  state={TileState.ReadOnly}
                  value={EQUATION_CHARACTER_MAP[eqValue] ?? eqValue}
                />
              );
            }

            const [start] = getStartEnd(equation, eqCompIndex);
            const slicedValue = getValueForTerm(value, equation, eqCompIndex);

            return eqValue.split("").map((_, eqValueIndex) => {
              return (
                <InputTile
                  key={eqCompIndex + eqValueIndex}
                  isFocussed={start + eqValueIndex === value.length}
                  size={size}
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
