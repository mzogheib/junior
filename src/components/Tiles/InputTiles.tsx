import InputTile from "@/components/Tiles/InputTile";
import Tile from "@/components/Tiles/Tile";
import Tiles from "@/components/Tiles/Tiles";
import { TileVariant } from "@/components/Tiles/types";
import {
  CHARACTER_DISPLAY_MAP,
  getSegmentValueFromInput,
  getStartEndOfSegment,
  isReadOnlySegment,
  TargetSegments,
} from "@/services/segments";

type Props = {
  targetSegments: TargetSegments;
  inputValue: string;
};

const InputTiles = ({ targetSegments, inputValue }: Props) => {
  const renderReadOnlyTile = (segmentValue: string, segmentIndex: number) => (
    <Tile key={segmentIndex} variant={TileVariant.ReadOnly}>
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

  return (
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
  );
};

export default InputTiles;
