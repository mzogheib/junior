import {
  TargetSegments,
  EquationComponentType,
  CHARACTER_DISPLAY_MAP,
  isEquationTerm,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import InvisibleInputForm from "./InvisibleInputForm";
import InputTiles, { InputTile } from "./InputTiles";
import Tile, { TileSize, TileState } from "./Tile";

const getStartEnd = (targetSegments: TargetSegments, eqCompIndex: number) => {
  const prevTerms = targetSegments.slice(0, eqCompIndex).filter(isEquationTerm);
  const prevTermsString = stringifyEquation(prevTerms);
  const prevTermsLength = prevTermsString.length;
  const termLength = targetSegments[eqCompIndex].value.length;

  return [prevTermsLength, prevTermsLength + termLength];
};

const getValueForTerm = (
  inputValue: string,
  targetSegments: TargetSegments,
  eqCompIndex: number
) => {
  const [start, end] = getStartEnd(targetSegments, eqCompIndex);
  return inputValue.slice(start, end);
};

type Props = {
  mode: "letters" | "numbers";
  size?: TileSize;
  targetSegments: TargetSegments;
  onSubmit: (attempt: string) => void;
  onValidate: (targetSegments: TargetSegments) => boolean;
};

const TileInputForm = ({
  mode,
  size,
  targetSegments,
  onSubmit,
  onValidate,
}: Props) => {
  const makeAttempt = (value: string) =>
    targetSegments.map((segment, index) => {
      if (segment.type === EquationComponentType.Operator) {
        return segment;
      }

      return {
        ...segment,
        value: getValueForTerm(value, targetSegments, index),
      };
    });

  const handleSubmit = (value: string) =>
    onSubmit(stringifyEquation(makeAttempt(value)));

  const handleValidate = (value: string) => onValidate(makeAttempt(value));

  const termsString = stringifyEquation(targetSegments.filter(isEquationTerm));

  const renderReadOnlyTile = (segmentValue: string, segmentIndex: number) => (
    <Tile
      key={segmentIndex}
      size={size}
      state={TileState.ReadOnly}
      value={CHARACTER_DISPLAY_MAP[segmentValue] ?? segmentValue}
    />
  );

  const renderInputTile = (
    inputValue: string,
    segmentValue: string,
    segmentIndex: number
  ) => {
    const [start] = getStartEnd(targetSegments, segmentIndex);
    const slicedValue = getValueForTerm(
      inputValue,
      targetSegments,
      segmentIndex
    );

    return segmentValue.split("").map((_, segmentValueIndex) => {
      return (
        <InputTile
          key={segmentIndex + segmentValueIndex}
          isFocussed={start + segmentValueIndex === inputValue.length}
          size={size}
        >
          {slicedValue[segmentValueIndex]}
        </InputTile>
      );
    });
  };

  return (
    <InvisibleInputForm
      mode={mode}
      length={termsString.length}
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      renderInput={(inputValue, onClick) => (
        <InputTiles onClick={onClick}>
          {targetSegments.map(({ value }, segmentIndex) => {
            if (READ_ONLY_CHARACTERS.includes(value)) {
              return renderReadOnlyTile(value, segmentIndex);
            }

            return renderInputTile(inputValue, value, segmentIndex);
          })}
        </InputTiles>
      )}
    />
  );
};

export default TileInputForm;
