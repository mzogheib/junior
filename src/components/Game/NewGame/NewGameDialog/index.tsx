import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { GameDifficulty, GameMode, WordLength } from "../../types";
import { useNewGame } from "./../NewGameProvider";
import ModeSettings from "./ModeSettings";
import LettersSettings from "./LettersSettings";
import NumbersSettings from "./NumbersSettings";
import { ChangeHandler } from "./types";

// Maybe trying to be a little too clever...
const handleChange =
  <V,>(setValue: (value: V) => void): ChangeHandler<V> =>
  (event, value) => {
    if (value) setValue(value);
  };

const NewGameDialog = () => {
  const { gameConfig, onNewGame, setIsNewGameDialogOpen } = useNewGame();
  const [mode, setMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(WordLength.Five);
  const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
  const [shouldSaveSettings, setShouldSaveSettings] = useState(false);

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
        <ModeSettings value={mode} onChange={handleChangeMode} />

        {mode === GameMode.Letters && (
          <LettersSettings
            value={targetLength}
            onChange={handleChangeTargetLength}
          />
        )}

        {mode === GameMode.Numbers && (
          <NumbersSettings
            value={difficulty}
            onChange={handleChangeDifficulty}
          />
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
