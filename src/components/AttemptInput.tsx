import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
} from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  height: 0;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0;
  position: absolute;
`;

const InputTiles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputTile = styled.div<{ isFocussed: boolean }>`
  width: 50px;
  height: 50px;
  border: 1px ${({ isFocussed }) => (isFocussed ? 'black' : 'gray')} solid;
  margin: 0 2px;
  color: black;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering
const useFocus = (): [any, () => void] => {
  const htmlElRef: MutableRefObject<any> = useRef(null);
  const setFocus = (): void => {
    htmlElRef?.current?.focus?.();
  };

  return [htmlElRef, setFocus];
};

type Props = {
  onSubmit: (attempt: string) => void;
  length: number;
};

const AttemptInput = ({ onSubmit, length }: Props) => {
  const POSITIONS = Array.from(Array(length).keys());
  const [inputRef, setInputFocus] = useFocus();
  const [attempt, setAttempt] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only letters are allowed
    const reg = /^[a-z]+$/i;
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
    <form onSubmit={handleSubmit}>
      <Input
        type="tel"
        value={attempt}
        maxLength={length}
        onChange={handleChange}
        autoFocus
        ref={inputRef}
      />
      <InputTiles onClick={setInputFocus}>
        {POSITIONS.map((position) => (
          <InputTile key={position} isFocussed={position === attempt.length}>
            {attempt[position]}
          </InputTile>
        ))}
      </InputTiles>
    </form>
  );
};

export default AttemptInput;
