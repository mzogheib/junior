import { useState } from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerMenu from "./DrawerMenu";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  isLoading?: boolean;
  onNewGame(): void;
};

const AppHeader = ({ isLoading, onNewGame }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Button disabled={isLoading} onClick={onNewGame} color="inherit">
            new game
          </Button>

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
