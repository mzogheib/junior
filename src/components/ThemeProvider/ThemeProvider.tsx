import React, { FC, useState, createContext, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme, PaletteMode } from '@mui/material';

type ThemeContextValue = {
  onToggleMode?: () => void;
  mode?: PaletteMode;
};

const ThemeContext = createContext<ThemeContextValue>({});

export const useTheme = () => useContext(ThemeContext);

// Pass the base MUI theme into Emotion so that it is accessible by Emotion's styled function.
// The declaration file ensures the full type of MUI's Theme is available to styled components.

const ThemeProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const handleToggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ onToggleMode: handleToggleMode, mode }}>
      <EmotionThemeProvider theme={createTheme({ palette: { mode } })}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
