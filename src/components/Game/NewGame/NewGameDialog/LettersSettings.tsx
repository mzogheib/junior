import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

import { WordLength } from "components/Game/types";
import { ChangeHandler } from "components/Game/NewGame/NewGameDialog/types";

type Props = {
  value: WordLength;
  onChange: ChangeHandler<WordLength>;
};

const LettersSettings = ({ value, onChange }: Props) => (
  <>
    <Typography variant="body1">
      <br />
      How many letters?
    </Typography>

    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="word length"
    >
      <ToggleButton value={WordLength.Five} aria-label="five">
        five
      </ToggleButton>
      <ToggleButton value={WordLength.Six} aria-label="six">
        six
      </ToggleButton>
    </ToggleButtonGroup>
  </>
);

export default LettersSettings;
