import { useState } from "react";
import styled from "@emotion/styled";

import {
  isWriteableSegment,
  makeAttemptSegments,
  stringifyTargetSegments,
  TargetSegments,
} from "services/segments";
import { GameMode } from "components/Game/types";
import MUIKeyboard from "components/Input/MuiKeyboard";
import { spacing } from "components/Theme/utils";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 ${spacing(1)} ${spacing(4)};
  width: 100%;
  max-width: 500px;
`;

type Props = {
  mode: GameMode;
  targetSegments: TargetSegments;
  mutedKeys?: string[];
  onChange: (attemptSegments: TargetSegments) => void;
  onEnter: () => void;
};

const Keyboard = ({
  mode,
  targetSegments,
  mutedKeys,
  onChange,
  onEnter,
}: Props) => {
  const [value, setValue] = useState("");

  const targetValue = stringifyTargetSegments(
    targetSegments.filter(isWriteableSegment)
  );

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

    if (value.length === targetValue.length) {
      return;
    }

    const newValue = value.concat(key);

    handleNewValue(newValue);
  };

  return (
    <Wrapper>
      <MUIKeyboard
        layout={mode}
        onKeyPress={handleKeyPress}
        mutedKeys={mutedKeys}
      />
    </Wrapper>
  );
};

export default Keyboard;
