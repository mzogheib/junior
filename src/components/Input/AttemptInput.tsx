import { ChangeEvent, RefObject, useEffect } from "react";

import {
  TargetSegments,
  stringifyTargetSegments,
  makeAttemptSegments,
  getWriteableSegments,
} from "@/services/segments";
import InvisibleInput from "@/components/Input/InvisibleInput";
import InputTiles from "@/components/Tiles/InputTiles";

type Props = {
  targetSegments: TargetSegments;
  attemptSegments: TargetSegments;
  mode: "letters" | "numbers";
  inputRef?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  onChange: (attemptSegments: TargetSegments) => void;
  onComplete?: (attemptSegments: TargetSegments) => void;
};

const AttemptInput = ({
  targetSegments,
  mode,
  attemptSegments,
  inputRef,
  autoFocus,
  onChange,
  onComplete,
}: Props) => {
  const attemptLength = stringifyTargetSegments(attemptSegments).length;
  const targetLength = stringifyTargetSegments(targetSegments).length;
  const isComplete = attemptLength === targetLength;

  useEffect(() => {
    if (isComplete) {
      onComplete?.(attemptSegments);
    }
  }, [attemptSegments, isComplete, onComplete]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();

    const reg = mode === "letters" ? /^[a-z]+$/i : /^[0-9]+$/i;
    if (inputValue && !reg.test(inputValue)) {
      return;
    }

    const newAttemptSegments = makeAttemptSegments(inputValue, targetSegments);
    onChange(newAttemptSegments);
  };

  const writeableSegments = getWriteableSegments(attemptSegments);
  const inputValue = stringifyTargetSegments(writeableSegments);
  const inputType = mode === "numbers" ? "tel" : undefined;

  return (
    <InvisibleInput
      value={inputValue}
      onChange={handleChange}
      autoFocus={autoFocus}
      type={inputType}
      inputRef={inputRef}
    >
      <InputTiles targetSegments={targetSegments} inputValue={inputValue} />
    </InvisibleInput>
  );
};

export default AttemptInput;
