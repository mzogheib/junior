import React, { useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Modal from "./Modal";
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
    <Modal open={isOpen}>
      <>
        <Modal.Content>
          <Modal.Header onClose={onCancel}>New Game</Modal.Header>
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

          <Modal.Buttons>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              variant="contained"
            >
              Go!
            </Button>
          </Modal.Buttons>
        </Modal.Content>
      </>
    </Modal>
  );
};

export default NewGameModal;
