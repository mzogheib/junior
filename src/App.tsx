import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AttemptInput from './components/AttemptInput';
import Tile, { TileState } from './components/Tile';
import Tiles from './components/Tiles';
import Attempts from './components/Attempts';

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee

const TARGET_LENGTH = 5;
const POSITIONS = Array.from(Array(TARGET_LENGTH).keys());

const Wrapper = styled.div`
  background-color: #eeeeee;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getTileState = (target: string, attempt: string, position: number) => {
  return target[position] === attempt[position]
    ? TileState.Match
    : target.includes(attempt[position])
    ? TileState.Present
    : TileState.Absent;
};

const makeRandomNumberString = () =>
  Math.random()
    .toString()
    .substring(2, TARGET_LENGTH + 2);

const App = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [didSucceed, setDidSucceed] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    setTarget(makeRandomNumberString());
  }, []);

  const handleSubmit = (attempt: string) => {
    setAttempts(attempts.concat([attempt]));

    if (attempt === target) {
      setDidSucceed(true);
    }
  };

  const handleReset = () => {
    setAttempts([]);
    setDidSucceed(false);
    setTarget(makeRandomNumberString());
  };

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
      {!!attempts.length && (
        <Attempts>
          {attempts.map((attempt, i) => (
            <div key={`${attempt}-${i}`}>{renderAttempt(attempt)}</div>
          ))}
        </Attempts>
      )}
      <AttemptInput onSubmit={handleSubmit} length={TARGET_LENGTH} />
      {didSucceed && (
        <div>
          <div>Success! Solved in {attempts.length} attempt(s).</div>
        </div>
      )}
      <button type="button" onClick={handleReset}>
        New game
      </button>
    </Wrapper>
  );
};

export default App;
