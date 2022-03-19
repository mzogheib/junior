import Tile, { TileState } from './Tile';
import Tiles from './Tiles';

const getTileState = (
  target: string,
  attempt: string,
  position: number,
  readOnlyValues?: string[]
) => {
  if (readOnlyValues?.includes(target[position])) {
    return TileState.ReadOnly;
  }

  return target[position] === attempt[position]
    ? TileState.Match
    : target.includes(attempt[position])
    ? TileState.Present
    : TileState.Absent;
};

type Props = {
  target: string;
  attempt: string;
  readOnlyValues?: string[];
};

const Attempt = ({ target, attempt, readOnlyValues }: Props) => {
  const POSITIONS = Array.from(Array(target.length).keys());

  return (
    <Tiles>
      {POSITIONS.map((position) => (
        <Tile
          key={position}
          value={attempt[position]}
          state={getTileState(target, attempt, position, readOnlyValues)}
        />
      ))}
    </Tiles>
  );
};

export default Attempt;
