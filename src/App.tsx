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

  const handleSubmit = (submittedWord: string) => {
    setAttempts(attempts.concat([submittedWord]));
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
      <WordInput onSubmit={handleSubmit} length={WORD_LENGTH} />
      <div>
        {attempts.map((attempt, i) => (
          <div key={`${attempt}-${i}`}>{renderAttempt(attempt)}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
