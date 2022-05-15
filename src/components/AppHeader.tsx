import { useState } from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerMenu from "./DrawerMenu";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  hasSavedGameSettings?: boolean;
  onNewGame(isCustom?: boolean): void;
};

const AppHeader = ({ hasSavedGameSettings, onNewGame }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewGame = (isCustom?: boolean) => {
    onNewGame(isCustom);
    setIsMenuOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <IconButton onClick={() => setIsMenuOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
      <DrawerMenu
        isOpen={isMenuOpen}
        hasSavedGameSettings={hasSavedGameSettings}
        onNewGame={handleNewGame}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default AppHeader;
