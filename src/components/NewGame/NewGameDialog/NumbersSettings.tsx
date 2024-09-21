import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

import { GameDifficulty } from "@/components/Game/types";
import { ChangeHandler } from "@/components/NewGame/NewGameDialog/types";

type Props = {
  value: GameDifficulty;
  onChange: ChangeHandler<GameDifficulty>;
};

const NumbersSettings = ({ value, onChange }: Props) => (
  <>
    <Typography variant="body1">
      <br />
      Difficulty
    </Typography>

    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="game difficulty"
    >
      <ToggleButton value={GameDifficulty.Easy} aria-label="easy">
        easy
      </ToggleButton>
      <ToggleButton value={GameDifficulty.Hard} aria-label="hard">
        hard
      </ToggleButton>
    </ToggleButtonGroup>
  </>
);

export default NumbersSettings;
