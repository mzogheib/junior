import {
  TargetSegments,
  SegmentType,
  CHARACTER_DISPLAY_MAP,
  isEquationTerm,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
} from "../services/equation";
import InvisibleInputForm from "./InvisibleInputForm";
import InputTiles, { InputTile } from "./InputTiles";
import Tile, { TileSize, TileState } from "./Tile";

const getStartEnd = (targetSegments: TargetSegments, segmentIndex: number) => {
  const prevTerms = targetSegments
    .slice(0, segmentIndex)
    .filter(isEquationTerm);
  const prevTermsString = stringifyTargetSegments(prevTerms);
  const prevTermsLength = prevTermsString.length;
  const termLength = targetSegments[segmentIndex].value.length;

  return [prevTermsLength, prevTermsLength + termLength];
};

const getValueForTerm = (
  inputValue: string,
  targetSegments: TargetSegments,
  segmentIndex: number
) => {
  const [start, end] = getStartEnd(targetSegments, segmentIndex);
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
      if (segment.type === SegmentType.ReadOnly) {
        return segment;
      }

      return {
        ...segment,
        value: getValueForTerm(value, targetSegments, index),
      };
    });

  const handleSubmit = (value: string) =>
    onSubmit(stringifyTargetSegments(makeAttempt(value)));

  const handleValidate = (value: string) => onValidate(makeAttempt(value));

  const termsString = stringifyTargetSegments(
    targetSegments.filter(isEquationTerm)
  );

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
