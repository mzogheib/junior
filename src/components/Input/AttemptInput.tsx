import { ChangeEvent, useRef } from "react";
import {
  TargetSegments,
  CHARACTER_DISPLAY_MAP,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
  makeAttemptSegments,
  getSegmentValueFromInput,
  getStartEndOfSegment,
} from "../../services/segments";
import InputTile from "../Game/InputTile";
import Tile, { TileState } from "../Game/Tile";
import Tiles from "../Game/Tiles";
import InvisibleInput from "./InvisibleInput";

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
    <Tile key={segmentIndex} state={TileState.ReadOnly}>
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
