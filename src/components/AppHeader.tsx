import { useState } from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerMenu from "components/DrawerMenu";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
`;

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        onClose={() => setIsMenuOpen(false)}
        onClickNewGame={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default AppHeader;
