import React, { useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import { GameMode } from "../misc/types";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (gameMode: GameMode, length: number) => void;
  onCancel?: () => void;
};

const NewGameDialog = ({ isOpen, isLoading, onSubmit, onCancel }: Props) => {
  const [gameMode, setGameMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(5);

  const handleSubmit = () => onSubmit(gameMode, targetLength);

  const handleChangeGameMode = (
    event: React.MouseEvent<HTMLElement>,
    value: GameMode | null
  ) => {
    if (value) {
      setGameMode(value);
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
          <ToggleButton value={GameMode.Numbers} aria-label="equations">
            Equations
          </ToggleButton>
          <ToggleButton value={GameMode.Letters} aria-label="words">
            Words
          </ToggleButton>
        </ToggleButtonGroup>

        {gameMode === "letters" && (
          <>
            <Typography variant="body1" color="primary.main">
              <br />
              How many letters?
            </Typography>

            <ToggleButtonGroup
              value={targetLength}
              exclusive
              onChange={handleChangeTargetLength}
              aria-label="game mode"
            >
              <ToggleButton value={5} aria-label="five">
                five
              </ToggleButton>
              <ToggleButton value={6} aria-label="six">
                six
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}
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
