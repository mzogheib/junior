import { useState, ChangeEvent, FormEvent } from 'react';

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

const WordInput = () => {
  const [word, setWord] = useState('');
  const [didSumbit, setDidSubmit] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only letters are allowed
    const reg = /^[a-z]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    setDidSubmit(false);
    setWord(inputValue.toUpperCase());
  };

  const isValid = word.length === WORD_LENGTH;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setDidSubmit(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          maxLength={WORD_LENGTH}
          onChange={handleChange}
        />
      </form>
      <div>
        {didSumbit &&
          POSITIONS.map((position) => (
            <span
              key={position}
              style={{
                color: getLetterColor(TARGET_WORD, word, position),
              }}
            >
              {word[position]}
            </span>
          ))}
      </div>
    </div>
  );
};

export default WordInput;
