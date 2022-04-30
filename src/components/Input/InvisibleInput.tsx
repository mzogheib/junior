import { ReactNode, InputHTMLAttributes, forwardRef } from "react";
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
  children: ReactNode;
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = OwnProps & InputProps;

const InvisibleInput = forwardRef<HTMLInputElement, Props>(
  ({ children, ...inputProps }, ref) => (
    <>
      <Input {...inputProps} ref={ref} />
      {children}
    </>
  )
);

export default InvisibleInput;
