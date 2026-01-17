import { useState, createContext, useContext } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, PaletteMode } from "@mui/material";

import { ChildrenProp } from "types";
import { setThemeColorMetaTag } from "./utils";

type ThemeContextValue = {
  setMode?: (mode: PaletteMode) => void;
  mode?: PaletteMode;
};

const ThemeContext = createContext<ThemeContextValue>({});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: ChildrenProp) => {
  const [mode, _setMode] = useState<PaletteMode>("light");

  const setMode = (newMode: PaletteMode) => {
    setThemeColorMetaTag(newMode);
    _setMode(newMode);
  };

  // Pass the base MUI theme into Emotion so that it is accessible by Emotion's styled function.
  // The declaration file ensures the full type of MUI's Theme is available to styled components.
  const muiTheme = createTheme({ palette: { mode } });
  const renderThemeProvider = () => (
    <EmotionThemeProvider theme={muiTheme}>{children}</EmotionThemeProvider>
  );

  return (
    <ThemeContext.Provider value={{ setMode, mode }}>
      {renderThemeProvider()}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
