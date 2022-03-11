import styled from '@emotion/styled';

import Tile, { TileState } from './Tile';
import Tiles from './Tiles';

const getTileState = (target: string, attempt: string, position: number) => {
  return target[position] === attempt[position]
    ? TileState.Match
    : target.includes(attempt[position])
    ? TileState.Present
    : TileState.Absent;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  target: string;
  attempts: string[];
};

const Attempts = ({ target, attempts }: Props) => {
  const POSITIONS = Array.from(Array(target.length).keys());

  const renderAttempt = (attempt: string) => (
    <Tiles>
      {POSITIONS.map((position) => (
        <Tile
          key={position}
          letter={attempt[position]}
          state={getTileState(target, attempt, position)}
        />
      ))}
    </Tiles>
  );

  return (
    <Wrapper>
      {attempts.map((attempt, i) => (
        <div key={`${attempt}-${i}`}>{renderAttempt(attempt)}</div>
      ))}
    </Wrapper>
  );
};

export default Attempts;
