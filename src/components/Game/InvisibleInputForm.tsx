import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
  ReactNode,
} from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

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
  mode: "letters" | "numbers";
  onSubmit: (attempt: string) => void;
  onValidate: (attempt: string) => boolean;
  renderInput: (value: string, onClick: () => void) => ReactNode;
};

const InvisibleInputForm = ({
  length,
  mode,
  onSubmit,
  onValidate,
  renderInput,
}: Props) => {
  const [inputRef, setInputFocus] = useFocus();
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const reg = mode === "letters" ? /^[a-z]+$/i : /^[0-9]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    setValue(inputValue.toUpperCase());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isComplete = value.length === length;
    if (!isComplete) {
      return;
    }

    if (onValidate(value)) {
      onSubmit(value);
      setValue("");
    }
  };

  const inputType = mode === "numbers" ? "tel" : undefined;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type={inputType}
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
    </Form>
  );
};

export default InvisibleInputForm;
