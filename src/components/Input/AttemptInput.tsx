import { ChangeEvent, useRef } from "react";
import {
  TargetSegments,
  SegmentType,
  CHARACTER_DISPLAY_MAP,
  isWriteableSegment,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
} from "../../services/segments";
import InputTile from "../Game/InputTile";
import Tile, { TileState } from "../Game/Tile";
import Tiles from "../Game/Tiles";
import InvisibleInput from "./InvisibleInput";

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
  targetSegments: TargetSegments;
  attemptSegments: TargetSegments;
  mode: "letters" | "numbers";
  onChange: (attemptSegments: TargetSegments) => void;
};

const AttemptInput = ({
  targetSegments,
  mode,
  attemptSegments,
  onChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTilesClick = () => inputRef.current?.focus();

  const makeAttemptSegments = (inputValue: string) =>
    targetSegments.map((segment, index) => {
      if (segment.type === SegmentType.ReadOnly) {
        return segment;
      }

      return {
        ...segment,
        value: getSegmentValueFromInput(inputValue, targetSegments, index),
      };
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();

    const reg = mode === "letters" ? /^[a-z]+$/i : /^[0-9]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    const newAttemptSegments = makeAttemptSegments(inputValue);
    onChange(newAttemptSegments);
  };

  const renderReadOnlyTile = (segmentValue: string, segmentIndex: number) => (
    <Tile key={segmentIndex} state={TileState.ReadOnly}>
      {CHARACTER_DISPLAY_MAP[segmentValue] ?? segmentValue}
    </Tile>
  );

  const renderInputTiles = (
    inputValue: string,
    targetSegmentValue: string,
    targetSegmentIndex: number
  ) => {
    const [start] = getStartEndOfSegment(targetSegments, targetSegmentIndex);
    const slicedInputValue = getSegmentValueFromInput(
      inputValue,
      targetSegments,
      targetSegmentIndex
    );

    return targetSegmentValue.split("").map((_, targetSegmentValueIndex) => {
      const key = targetSegmentIndex + targetSegmentValueIndex;
      const isFocussed = start + targetSegmentValueIndex === inputValue.length;

      return (
        <InputTile key={key} isFocussed={isFocussed}>
          {slicedInputValue[targetSegmentValueIndex]}
        </InputTile>
      );
    });
  };

  const writeableSegments = attemptSegments.filter(
    ({ value }) => !READ_ONLY_CHARACTERS.includes(value)
  );

  const inputValue = stringifyTargetSegments(writeableSegments);

  return (
    <InvisibleInput value={inputValue} onChange={handleChange} ref={inputRef}>
      <Tiles onClick={handleTilesClick}>
        {targetSegments.map(
          ({ value: targetSegmentValue }, targetSegmentIndex) => {
            if (READ_ONLY_CHARACTERS.includes(targetSegmentValue)) {
              return renderReadOnlyTile(targetSegmentValue, targetSegmentIndex);
            }

            return renderInputTiles(
              inputValue,
              targetSegmentValue,
              targetSegmentIndex
            );
          }
        )}
      </Tiles>
    </InvisibleInput>
  );
};

export default AttemptInput;
