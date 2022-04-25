import React, { useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { GameDifficulty, GameMode, GameOptions, WordLength } from "./types";

type Props = {
  isLoading: boolean;
  onSubmit: (options: GameOptions) => void;
  onCancel?: () => void;
};

const NewGameDialog = ({ isLoading, onSubmit, onCancel }: Props) => {
  const [mode, setMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(WordLength.Five);
  const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
  const [isSaveSettings, setIsSaveSettings] = useState(false);

  const handleSubmit = () => onSubmit({ mode, targetLength, difficulty });

  const handleChangeMode = (
    event: React.MouseEvent<HTMLElement>,
    value: GameMode | null
  ) => {
    if (value) {
      setMode(value);
    }
  };

  const handleChangeTargetLength = (
    event: React.MouseEvent<HTMLElement>,
    value: number | null
  ) => {
    if (value) {
      setTargetLength(value);
    }
  };

  const handleChangeDifficulty = (
    event: React.MouseEvent<HTMLElement>,
    value: GameDifficulty | null
  ) => {
    if (value) {
      setDifficulty(value);
    }
  };

  const handleChangeSaveSettings = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsSaveSettings(event.target.checked);
  };

  return (
    <Dialog open={true}>
      <DialogTitle>New Game</DialogTitle>

      <DialogContent>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleChangeMode}
          aria-label="game mode"
        >
          <ToggleButton value={GameMode.Numbers} aria-label="equations">
            Equations
          </ToggleButton>
          <ToggleButton value={GameMode.Letters} aria-label="words">
            Words
          </ToggleButton>
        </ToggleButtonGroup>

        {mode === GameMode.Letters && (
          <>
            <Typography variant="body1" color="primary.main">
              <br />
              How many letters?
            </Typography>

            <ToggleButtonGroup
              value={targetLength}
              exclusive
              onChange={handleChangeTargetLength}
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
        )}

        {mode === GameMode.Numbers && (
          <>
            <Typography variant="body1" color="primary.main">
              <br />
              Difficulty
            </Typography>

            <ToggleButtonGroup
              value={difficulty}
              exclusive
              onChange={handleChangeDifficulty}
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
        )}
        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSaveSettings}
              onChange={handleChangeSaveSettings}
            />
          }
          label="Save settings"
        />
      </DialogContent>

      <DialogActions>
        {onCancel && (
          <Button disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button disabled={isLoading} onClick={handleSubmit}>
          Go!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
