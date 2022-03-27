import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
  ReactNode,
} from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const Input = styled.input`
  height: 0;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0;
  position: absolute;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
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
  length: number;
  onSubmit: (attempt: string) => void;
  renderInput: (value: string, onClick: () => void) => ReactNode;
};

const InvisibleInputForm = ({ length, onSubmit, renderInput }: Props) => {
  const [inputRef, setInputFocus] = useFocus();
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only letters are allowed
    const reg = /^[a-z]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    setValue(inputValue.toUpperCase());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = value.length === length;
    if (!isValid) {
      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={value}
        maxLength={length}
        onChange={handleChange}
        autoFocus
        ref={inputRef}
      />
      {renderInput(value, setInputFocus)}
      <ButtonWrapper>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </ButtonWrapper>
    </form>
  );
};

export default InvisibleInputForm;
