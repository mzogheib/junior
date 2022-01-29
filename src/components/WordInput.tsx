import { useState, ChangeEvent, FormEvent } from 'react';

type Props = {
  onSubmit: (attempt: string) => void;
  length: number;
};

const WordInput = ({ onSubmit, length }: Props) => {
  const [word, setWord] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only letters are allowed
    const reg = /^[a-z]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    setWord(inputValue.toUpperCase());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = word.length === length;
    if (!isValid) {
      return;
    }

    onSubmit(word);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          maxLength={length}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default WordInput;
