import { useState, ChangeEvent, FormEvent } from 'react';

type Props = {
  onSubmit: (attempt: string) => void;
  length: number;
};

const AttemptInput = ({ onSubmit, length }: Props) => {
  const [attempt, setAttempt] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only letters are allowed
    const reg = /^[0-9]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    setAttempt(inputValue.toUpperCase());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = attempt.length === length;
    if (!isValid) {
      return;
    }

    onSubmit(attempt);
    setAttempt('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={attempt}
          maxLength={length}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default AttemptInput;
