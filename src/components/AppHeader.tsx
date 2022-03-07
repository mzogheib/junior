import React from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { useTheme } from './ThemeProvider/ThemeProvider';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  onNewGame(): void;
};

const AppHeader = ({ onNewGame }: Props) => {
  const { onToggleMode, mode } = useTheme();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Button onClick={onNewGame} color="inherit">
          new game
        </Button>
        <Button onClick={onToggleMode} color="inherit">
          {mode === 'light' ? 'dark mode' : 'light mode'}
        </Button>
      </StyledToolbar>
    </AppBar>
  );
};

export default AppHeader;
