import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import WordInput from './components/WordInput';
import LetterTile from './components/LetterTile';
import LetterTiles from './components/LetterTiles';
import Attempts from './components/Attempts';

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee

const WORD_LENGTH = 5;
const POSITIONS = Array.from(Array(WORD_LENGTH).keys());

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
    .substring(2, WORD_LENGTH + 2);

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
    <LetterTiles>
      {POSITIONS.map((position) => (
        <LetterTile
          key={position}
          letter={attempt[position]}
          state={getLetterState(target, attempt, position)}
        />
      ))}
    </LetterTiles>
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
      <WordInput onSubmit={handleSubmit} length={WORD_LENGTH} />
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
