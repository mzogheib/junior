import { useState } from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
  hasSavedGameSettings?: boolean;
  onNewGame(isCustom?: boolean): void;
};

const AppHeader = ({ isLoading, hasSavedGameSettings, onNewGame }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewGame = (isCustom?: boolean) => () => onNewGame(isCustom);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <div>
            <Button
              disabled={isLoading}
              onClick={handleNewGame()}
              color="inherit"
              aria-label="new game"
            >
              new game
            </Button>
            {hasSavedGameSettings && (
              <IconButton
                disabled={isLoading}
                onClick={handleNewGame(true)}
                color="inherit"
                size="large"
                aria-label="customise game"
              >
                <SettingsIcon />
              </IconButton>
            )}
          </div>

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
