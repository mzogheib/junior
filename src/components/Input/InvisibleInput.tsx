import { ReactNode, InputHTMLAttributes, useRef } from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  height: 0;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0;
  position: absolute;
`;

type OwnProps = {
  children: (setFocus: () => void) => ReactNode;
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = OwnProps & InputProps;

const InvisibleInput = ({ children, ...inputProps }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const setFocus = () => inputRef.current?.focus();

  return (
    <>
      <Input {...inputProps} ref={inputRef} />
      {children(setFocus)}
    </>
  );
};

export default InvisibleInput;
