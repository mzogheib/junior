import React, { useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { GameMode } from "../../misc/types";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (gameMode: GameMode) => void;
  onCancel?: () => void;
};

const NewGameModal = ({ isOpen, isLoading, onSubmit, onCancel }: Props) => {
  const [gameMode, setGameMode] = useState(GameMode.Numbers);

  const handleSubmit = () => onSubmit(gameMode);

  const handleChangeGameMode = (
    event: React.MouseEvent<HTMLElement>,
    value: GameMode | null
  ) => {
    if (value) {
      setGameMode(value);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>New Game</DialogTitle>

      <DialogContent>
        <ToggleButtonGroup
          value={gameMode}
          exclusive
          onChange={handleChangeGameMode}
          aria-label="game mode"
        >
          <ToggleButton value={GameMode.Numbers} aria-label="numbers">
            Numbers
          </ToggleButton>
          <ToggleButton value={GameMode.Letters} aria-label="letters">
            Letters
          </ToggleButton>
        </ToggleButtonGroup>
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

export default NewGameModal;
