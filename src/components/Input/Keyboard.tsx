import RSKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { makeAttemptSegments, TargetSegments } from "../../services/segments";
import { GameMode } from "../Game/types";

const layout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "0", "{enter} {bksp}"],
  shift: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "Z X C V B N M",
    "{enter} {bksp}",
  ],
};

type Props = {
  mode: GameMode;
  targetSegments: TargetSegments;
  onChange: (attemptSegments: TargetSegments) => void;
  onEnter: () => void;
};

const Keyboard = ({ mode, targetSegments, onChange, onEnter }: Props) => {
  const handleChange = (value: string) => {
    const newAttemptSegments = makeAttemptSegments(
      value.toUpperCase(),
      targetSegments
    );
    onChange(newAttemptSegments);
  };

  const handleKeyPress = (value: string) => {
    if (value === "{enter}") {
      onEnter();
    }
  };

  return (
    <RSKeyboard
      layout={layout}
      layoutName={mode === GameMode.Letters ? "shift" : "default"}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Keyboard;
