import { ChangeEvent, RefObject } from "react";
import {
  TargetSegments,
  CHARACTER_DISPLAY_MAP,
  stringifyTargetSegments,
  makeAttemptSegments,
  getSegmentValueFromInput,
  getStartEndOfSegment,
  getWriteableSegments,
  isReadOnlySegment,
} from "../../services/segments";
import InputTile from "../Tiles/InputTile";
import { TileVariant } from "../Tiles/types";
import Tile from "../Tiles/Tile";
import Tiles from "../Tiles/Tiles";
import InvisibleInput from "./InvisibleInput";

type Props = {
  targetSegments: TargetSegments;
  attemptSegments: TargetSegments;
  mode: "letters" | "numbers";
  inputRef?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  isError?: boolean;
  onChange: (attemptSegments: TargetSegments) => void;
};

const AttemptInput = ({
  targetSegments,
  mode,
  attemptSegments,
  inputRef,
  autoFocus,
  isError,
  onChange,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();

    const reg = mode === "letters" ? /^[a-z]+$/i : /^[0-9]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    const newAttemptSegments = makeAttemptSegments(inputValue, targetSegments);
    onChange(newAttemptSegments);
  };

  const renderReadOnlyTile = (segmentValue: string, segmentIndex: number) => (
    <Tile key={segmentIndex} variant={TileVariant.ReadOnly} isError={isError}>
      {CHARACTER_DISPLAY_MAP[segmentValue] ?? segmentValue}
    </Tile>
  );

  const renderInputTiles = (
    inputValue: string,
    targetSegmentValue: string,
    targetSegmentIndex: number
  ) => {
    const slicedInputValue = getSegmentValueFromInput(
      inputValue,
      targetSegments,
      targetSegmentIndex
    );

    return targetSegmentValue.split("").map((_, targetSegmentValueIndex) => {
      const key = targetSegmentIndex + targetSegmentValueIndex;
      const [start] = getStartEndOfSegment(targetSegments, targetSegmentIndex);
      const isFocussed = start + targetSegmentValueIndex === inputValue.length;

      return (
        <InputTile key={key} isFocussed={isFocussed} isError={isError}>
          {slicedInputValue[targetSegmentValueIndex]}
        </InputTile>
      );
    });
  };

  const writeableSegments = getWriteableSegments(attemptSegments);
  const inputValue = stringifyTargetSegments(writeableSegments);
  const inputType = mode === "numbers" ? "tel" : undefined;

  return (
    <InvisibleInput
      value={inputValue}
      onChange={handleChange}
      autoFocus={autoFocus}
      type={inputType}
      inputRef={inputRef}
    >
      <Tiles>
        {targetSegments.map((targetSegment, targetSegmentIndex) => {
          if (isReadOnlySegment(targetSegment)) {
            return renderReadOnlyTile(targetSegment.value, targetSegmentIndex);
          }

          return renderInputTiles(
            inputValue,
            targetSegment.value,
            targetSegmentIndex
          );
        })}
      </Tiles>
    </InvisibleInput>
  );
};

export default AttemptInput;
