import { FormEvent, useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

import { stringifyTargetSegments, TargetSegments } from "@/services/segments";
import AttemptInput from "@/components/Input/AttemptInput";

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
  onChange: () => void;
  onSubmit: (attemptSegments: TargetSegments) => void;
  onValidate: (attemptSegments: TargetSegments) => boolean;
};

const InputForm = ({
  mode,
  targetSegments,
  onChange,
  onSubmit,
  onValidate,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [attemptSegments, setAttemptSegments] = useState<TargetSegments>([]);

  const attemptLength = stringifyTargetSegments(attemptSegments).length;
  const targetLength = stringifyTargetSegments(targetSegments).length;
  const isComplete = attemptLength === targetLength;

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

  const handleChange = (newAttemptSegments: TargetSegments) => {
    setAttemptSegments(newAttemptSegments);
    onChange();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AttemptInput
        targetSegments={targetSegments}
        mode={mode}
        attemptSegments={attemptSegments}
        onChange={handleChange}
        onComplete={onValidate}
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
