import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AttemptInput from './components/AttemptInput';
import Tile from './components/Tile';
import Tiles from './components/Tiles';
import Attempts from './components/Attempts';

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee

const NUMBER_LENGTH = 5;
const POSITIONS = Array.from(Array(NUMBER_LENGTH).keys());

const Wrapper = styled.div`
  background-color: #eeeeee;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getLetterState = (
  targetWord: string,
  inputWord: string,
  position: number
) => {
  return targetWord[position] === inputWord[position]
    ? 'match'
    : targetWord.includes(inputWord[position])
    ? 'present'
    : 'absent';
};

const makeRandomNumberString = () =>
  Math.random()
    .toString()
    .substring(2, NUMBER_LENGTH + 2);

const App = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [didSucceed, setDidSucceed] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    setTarget(makeRandomNumberString());
  }, []);

  const handleSubmit = (submittedWord: string) => {
    setAttempts(attempts.concat([submittedWord]));

    if (submittedWord === target) {
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
          state={getLetterState(target, attempt, position)}
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
      <AttemptInput onSubmit={handleSubmit} length={NUMBER_LENGTH} />
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
