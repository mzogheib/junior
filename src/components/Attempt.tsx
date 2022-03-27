import Tile, { TileSize, TileState } from './Tile';
import Tiles from './Tiles';

const getTileState = (
  target: string,
  attempt: string,
  index: number,
  readOnlyValues?: string[]
) => {
  if (readOnlyValues?.includes(target[index])) {
    return TileState.ReadOnly;
  }

  return target[index] === attempt[index]
    ? TileState.Match
    : target.includes(attempt[index])
    ? TileState.Present
    : TileState.Absent;
};

type Props = {
  target: string;
  attempt: string;
  readOnlyValues?: string[];
  size?: TileSize;
};

const Attempt = ({ target, attempt, readOnlyValues, size }: Props) => (
  <Tiles>
    {target.split('').map((_, index) => (
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
