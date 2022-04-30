import { FormEvent, useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

import { TargetSegments } from "../../services/segments";
import AttemptInput from "../Input/AttemptInput";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

type Props = {
  mode: "letters" | "numbers";
  targetSegments: TargetSegments;
  onSubmit: (attemptSegments: TargetSegments) => void;
  onValidate: (attemptSegments: TargetSegments) => boolean;
};

const InputForm = ({ mode, targetSegments, onSubmit, onValidate }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [attemptSegments, setAttemptSegments] = useState<TargetSegments>([]);

  const isComplete = attemptSegments.length === targetSegments.length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.focus();

    if (!isComplete) {
      return;
    }

    if (onValidate(attemptSegments)) {
      onSubmit(attemptSegments);
      setAttemptSegments([]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AttemptInput
        targetSegments={targetSegments}
        mode={mode}
        attemptSegments={attemptSegments}
        onChange={setAttemptSegments}
        inputRef={inputRef}
        autoFocus
      />
      <ButtonWrapper>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default InputForm;
