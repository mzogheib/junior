import React, { useState } from 'react';
import './App.css';
import WordInput from './components/WordInput';

const WORD_LENGTH = 5;
const POSITIONS = Array.from(Array(WORD_LENGTH).keys());
const TARGET_WORD = 'FOCUS';

const getLetterColor = (
  targetWord: string,
  inputWord: string,
  position: number
) => {
  return targetWord[position] === inputWord[position]
    ? 'green'
    : targetWord.includes(inputWord[position])
    ? 'orange'
    : 'gray';
};

const App = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [didSucceed, setDidSucceed] = useState(false);

  const handleSubmit = (submittedWord: string) => {
    setAttempts(attempts.concat([submittedWord]));

    if (submittedWord === TARGET_WORD) {
      setDidSucceed(true);
    }
  };

  const handleReset = () => {
    setAttempts([]);
    setDidSucceed(false);
  };

  const renderAttempt = (attempt: string) =>
    POSITIONS.map((position) => (
      <span
        key={position}
        style={{
          color: getLetterColor(TARGET_WORD, attempt, position),
        }}
      >
        {attempt[position]}
      </span>
    ));

  return (
    <div className="App">
      {!!attempts.length && (
        <ol>
          {attempts.map((attempt, i) => (
            <li key={`${attempt}-${i}`}>{renderAttempt(attempt)}</li>
          ))}
        </ol>
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
    </div>
  );
};

export default App;
