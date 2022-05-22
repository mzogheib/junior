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

import { GameDifficulty, GameMode, WordLength } from "../types";
import { useNewGame } from "./NewGameProvider";

// Maybe trying to be a little too clever...
const handleChange =
  <V,>(setValue: (value: V) => void) =>
  (event: React.MouseEvent<HTMLElement>, value: V | null) => {
    if (value) setValue(value);
  };

const NewGameDialog = () => {
  const { gameConfig, isNewGameDialogOpen, onNewGame, setIsNewGameDialogOpen } =
    useNewGame();
  const [mode, setMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(WordLength.Five);
  const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
  const [shouldSaveSettings, setShouldSaveSettings] = useState(false);

  if (!isNewGameDialogOpen) {
    return null;
  }

  const isFirstGame = !gameConfig;

  const handleCancel = () => setIsNewGameDialogOpen(false);

  const handleSubmit = () => {
    onNewGame({ mode, targetLength, difficulty }, shouldSaveSettings);

    setIsNewGameDialogOpen(false);
  };

  const handleChangeMode = handleChange(setMode);
  const handleChangeTargetLength = handleChange(setTargetLength);
  const handleChangeDifficulty = handleChange(setDifficulty);

  const handleChangeSaveSettings = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShouldSaveSettings(event.target.checked);
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
            <Typography variant="body1">
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
            <Typography variant="body1">
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
              checked={shouldSaveSettings}
              onChange={handleChangeSaveSettings}
            />
          }
          label="Save settings"
        />
      </DialogContent>

      <DialogActions>
        {!isFirstGame && <Button onClick={handleCancel}>Cancel</Button>}
        <Button onClick={handleSubmit}>Go</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
