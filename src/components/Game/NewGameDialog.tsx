import React, { useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import { GameDifficulty, GameMode, GameOptions } from "./types";

type Props = {
  isLoading: boolean;
  onSubmit: (gameMode: GameMode, options: GameOptions) => void;
  onCancel?: () => void;
};

const NewGameDialog = ({ isLoading, onSubmit, onCancel }: Props) => {
  const [gameMode, setGameMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(5);
  const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);

  const handleSubmit = () => onSubmit(gameMode, { targetLength, difficulty });

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

  const handleChangeDifficulty = (
    event: React.MouseEvent<HTMLElement>,
    value: GameDifficulty | null
  ) => {
    if (value) {
      setDifficulty(value);
    }
  };

  return (
    <Dialog open={true}>
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

        {gameMode === GameMode.Letters && (
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
              <ToggleButton value={5} aria-label="five">
                five
              </ToggleButton>
              <ToggleButton value={6} aria-label="six">
                six
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}

        {gameMode === GameMode.Numbers && (
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
