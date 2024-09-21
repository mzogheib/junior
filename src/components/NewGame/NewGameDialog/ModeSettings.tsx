import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { GameMode } from "@/components/Game/types";
import { ChangeHandler } from "@/components/NewGame/NewGameDialog/types";

type Props = {
  value: GameMode;
  onChange: ChangeHandler<GameMode>;
};

const ModeSettings = ({ value, onChange }: Props) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={onChange}
    aria-label="game mode"
  >
    <ToggleButton value={GameMode.Numbers} aria-label="equations">
      Equations
    </ToggleButton>
    <ToggleButton value={GameMode.Letters} aria-label="words">
      Words
    </ToggleButton>
  </ToggleButtonGroup>
);

export default ModeSettings;
