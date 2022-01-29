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
  const [attempt, setAttempt] = useState('');

  const handleSubmit = (submittedWord: string) => {
    setAttempt(submittedWord);
  };

  return (
    <div className="App">
      <WordInput onSubmit={handleSubmit} length={WORD_LENGTH} />
      <div>
        {attempt &&
          POSITIONS.map((position) => (
            <span
              key={position}
              style={{
                color: getLetterColor(TARGET_WORD, attempt, position),
              }}
            >
              {attempt[position]}
            </span>
          ))}
      </div>
    </div>
  );
};

export default App;
