import Tiles from "../Tiles/Tiles";
import Tile, { TileState, TileVariant } from "../Tiles/Tile";

const getTileState = (
  target: string,
  attempt: string,
  index: number,
  readOnlyValues?: string[]
) => {
  const targetValue = target[index];
  const attemptValue = attempt[index];

  if (readOnlyValues?.includes(targetValue)) {
    return;
  }

  if (targetValue === attemptValue) {
    return TileState.Match;
  }

  // Remove matched values to avoid showing a value as present when it has
  // already been matched in another position.
  const unmatchedTarget = target
    .split("")
    .map((value, i) => {
      if (value === attempt[i]) {
        return "_";
      }

      return value;
    })
    .join("");

  if (unmatchedTarget.includes(attemptValue)) {
    return TileState.Present;
  }

  return TileState.Absent;
};

const getTileVariant = (
  target: string,
  index: number,
  readOnlyValues?: string[]
) => {
  const targetValue = target[index];

  if (readOnlyValues?.includes(targetValue)) {
    return TileVariant.ReadOnly;
  }

  return TileVariant.Default;
};

type Props = {
  target: string;
  attempt: string;
  readOnlyValues?: string[];
  characterMap?: Record<string, string>;
};

const Attempt = ({ target, attempt, readOnlyValues, characterMap }: Props) => (
  <Tiles>
    {target.split("").map((_, index) => (
      <Tile
        key={index}
        state={getTileState(target, attempt, index, readOnlyValues)}
        variant={getTileVariant(target, index, readOnlyValues)}
      >
        {characterMap?.[attempt[index]] ?? attempt[index]}
      </Tile>
    ))}
  </Tiles>
);

export default Attempt;
