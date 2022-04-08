import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Modal from "./Modal";
import { GameMode } from "../../misc/types";

const Content = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (gameMode: GameMode) => void;
};

const NewGameModal = ({ isOpen, isLoading, onSubmit }: Props) => {
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
      <Modal.Content>
        <Content variant="body1" color="primary.main">
          Choose a game type
        </Content>
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
    </Modal>
  );
};

export default NewGameModal;
