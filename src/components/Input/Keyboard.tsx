import RSKeyboard from "react-simple-keyboard";
import { ClassNames, ClassNamesContent } from "@emotion/react";
import "react-simple-keyboard/build/css/index.css";

import { makeAttemptSegments, TargetSegments } from "../../services/segments";
import { GameMode } from "../Game/types";

// TODO: look into making this more "material"

const makeThemeClass = ({ theme, css }: ClassNamesContent) => css`
  background-color: transparent;
`;

const makeButtonClass = ({ theme, css }: ClassNamesContent) => css`
  background-color: ${theme.palette.background.default} !important;
  box-shadow: unset !important;
  font-family: unset !important;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 25%) !important;
  color: ${theme.palette.mode === "light" ? "black" : "white"};
  border: 1px solid ${theme.palette.mode === "light" ? "black" : "white"};
  border-bottom: 1px solid ${theme.palette.mode === "light" ? "black" : "white"} !important;
  border-radius: ${theme.shape.borderRadius}px;
`;

const layout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "0", "{enter} {bksp}"],
  shift: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "Z X C V B N M",
    "{enter} {bksp}",
  ],
};

const allButtons = layout.default.concat(layout.shift).join(" ");

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

  const display = {
    "{bksp}": "⌫",
    "{enter}": "↵",
  };

  const layoutName = mode === GameMode.Letters ? "shift" : "default";

  return (
    <ClassNames>
      {(params) => (
        <RSKeyboard
          layout={layout}
          layoutName={layoutName}
          display={display}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          theme={params.cx(makeThemeClass(params), "hg-theme-default")}
          buttonTheme={[
            {
              class: makeButtonClass(params),
              buttons: allButtons,
            },
          ]}
        />
      )}
    </ClassNames>
  );
};

export default Keyboard;
