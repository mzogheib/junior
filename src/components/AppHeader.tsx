import { useState } from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

import DrawerMenu from "./DrawerMenu";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  isLoading?: boolean;
  onNewGame(isCustom?: boolean): void;
};

const AppHeader = ({ isLoading, onNewGame }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewGame = (isCustom?: boolean) => () => onNewGame(isCustom);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <ButtonGroup
            variant="text"
            aria-label="new game"
            disabled={isLoading}
          >
            <Button onClick={handleNewGame()} color="inherit">
              new game
            </Button>
            <IconButton
              onClick={handleNewGame(true)}
              color="inherit"
              size="large"
            >
              <SettingsIcon />
            </IconButton>
          </ButtonGroup>

          <IconButton onClick={() => setIsMenuOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default AppHeader;
