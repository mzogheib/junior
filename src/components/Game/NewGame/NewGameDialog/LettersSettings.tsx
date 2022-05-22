import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { WordLength } from "../../types";
import { ChangeHandler } from "./types";

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
