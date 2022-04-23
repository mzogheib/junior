import {
  TargetSegments,
  SegmentType,
  CHARACTER_DISPLAY_MAP,
  isWriteableSegment,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
} from "../../services/segments";
import InvisibleInputForm from "./InvisibleInputForm";
import InputTiles, { InputTile } from "./InputTiles";
import Tile, { TileSize, TileState } from "./Tile";

const getStartEndOfSegment = (
  targetSegments: TargetSegments,
  segmentIndex: number
) => {
  const prevSegments = targetSegments
    .slice(0, segmentIndex)
    .filter(isWriteableSegment);
  const prevSegmentsString = stringifyTargetSegments(prevSegments);
  const prevSegmentsStringLength = prevSegmentsString.length;
  const segmentValueLength = targetSegments[segmentIndex].value.length;

  const start = prevSegmentsStringLength;
  const end = prevSegmentsStringLength + segmentValueLength;

  return [start, end];
};

const getSegmentValueFromInput = (
  inputValue: string,
  targetSegments: TargetSegments,
  segmentIndex: number
) => {
  const [start, end] = getStartEndOfSegment(targetSegments, segmentIndex);
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
  const makeAttempt = (inputValue: string) =>
    targetSegments.map((segment, index) => {
      if (segment.type === SegmentType.ReadOnly) {
        return segment;
      }

      return {
        ...segment,
        value: getSegmentValueFromInput(inputValue, targetSegments, index),
      };
    });

  const handleSubmit = (value: string) =>
    onSubmit(stringifyTargetSegments(makeAttempt(value)));

  const handleValidate = (value: string) => onValidate(makeAttempt(value));

  const termsString = stringifyTargetSegments(
    targetSegments.filter(isWriteableSegment)
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
    const [start] = getStartEndOfSegment(targetSegments, segmentIndex);
    const slicedInputValue = getSegmentValueFromInput(
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
          {slicedInputValue[segmentValueIndex]}
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
