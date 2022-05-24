import React, { ReactNode, useState, createContext, useContext } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, PaletteMode } from "@mui/material";

type ThemeContextValue = {
  onToggleMode?: () => void;
  setMode?: (mode: PaletteMode) => void;
  mode?: PaletteMode;
};

const ThemeContext = createContext<ThemeContextValue>({});

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children?: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const handleToggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  // Pass the base MUI theme into Emotion so that it is accessible by Emotion's styled function.
  // The declaration file ensures the full type of MUI's Theme is available to styled components.
  const muiTheme = createTheme({ palette: { mode } });
  const renderThemeProvider = () => (
    <EmotionThemeProvider theme={muiTheme}>{children}</EmotionThemeProvider>
  );

  return (
    <ThemeContext.Provider
      value={{ onToggleMode: handleToggleMode, setMode, mode }}
    >
      {renderThemeProvider()}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
