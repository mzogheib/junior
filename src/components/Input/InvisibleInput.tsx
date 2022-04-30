import { ReactNode, InputHTMLAttributes, useRef, RefObject } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
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

type OwnProps = {
  children: ReactNode;
  inputRef?: RefObject<HTMLInputElement>;
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = OwnProps & InputProps;

const InvisibleInput = ({
  children,
  inputRef: customRef,
  ...inputProps
}: Props) => {
  const ownRef = useRef<HTMLInputElement>(null);
  const inputRef = customRef || ownRef;

  const setFocus = () => inputRef?.current?.focus();

  return (
    <Wrapper onClick={setFocus}>
      <Input {...inputProps} ref={inputRef} />
      {children}
    </Wrapper>
  );
};

export default InvisibleInput;
