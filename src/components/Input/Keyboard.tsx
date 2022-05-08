import { useState } from "react";
import styled from "@emotion/styled";

import {
  isWriteableSegment,
  makeAttemptSegments,
  stringifyTargetSegments,
  TargetSegments,
} from "../../services/segments";
import { GameMode } from "../Game/types";
import MUIKeyboard from "./MuiKeyboard";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 5px 20px;
  width: 100%;
  max-width: 500px;
`;

type Props = {
  mode: GameMode;
  targetSegments: TargetSegments;
  onChange: (attemptSegments: TargetSegments) => void;
  onEnter: () => void;
};

const Keyboard = ({ mode, targetSegments, onChange, onEnter }: Props) => {
  const [value, setValue] = useState("");

  const targetValueLength = stringifyTargetSegments(
    targetSegments.filter(isWriteableSegment)
  ).length;

  const handleNewValue = (newValue: string) => {
    setValue(newValue);

    const newAttemptSegments = makeAttemptSegments(
      newValue.toUpperCase(),
      targetSegments
    );

    onChange(newAttemptSegments);
  };

  const handleKeyPress = (key: string) => {
    if (key === "{enter}") {
      onEnter();
      return;
    }

    if (key === "{bksp}") {
      const newValue = value.slice(0, -1);
      handleNewValue(newValue);

      return;
    }

    if (value.length === targetValueLength) {
      return;
    }

    const newValue = value.concat(key);

    handleNewValue(newValue);
  };

  return (
    <Wrapper>
      <MUIKeyboard layout={mode} onKeyPress={handleKeyPress} />
    </Wrapper>
  );
};

export default Keyboard;
