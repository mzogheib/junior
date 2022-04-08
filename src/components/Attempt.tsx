import styled from "@emotion/styled";

import Tile, { TileSize, TileState } from "./Tile";

const Tiles = styled.div`
  display: flex;
`;

const getTileState = (
  target: string,
  attempt: string,
  index: number,
  readOnlyValues?: string[]
) => {
  if (readOnlyValues?.includes(target[index])) {
    return TileState.ReadOnly;
  }

  if (target[index] === attempt[index]) {
    return TileState.Match;
  }

  // Remove matched values to avoid showing a value as present when it has
  // already been matched in another position.
  const unmatchedTarget = target
    .split("")
    .map((value, i) => {
      if (target[i] === attempt[i]) {
        return "_";
      }

      return value;
    })
    .join("");

  if (unmatchedTarget.includes(attempt[index])) {
    return TileState.Present;
  }

  return TileState.Absent;
};

type Props = {
  target: string;
  attempt: string;
  readOnlyValues?: string[];
  size?: TileSize;
};

const Attempt = ({ target, attempt, readOnlyValues, size }: Props) => (
  <Tiles>
    {target.split("").map((_, index) => (
      <Tile
        size={size}
        key={index}
        value={attempt[index]}
        state={getTileState(target, attempt, index, readOnlyValues)}
      />
    ))}
  </Tiles>
);

export default Attempt;
