import { MouseEvent } from "react";
import { PaletteMode } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { setMode, mode } = useTheme();

  const handleThemeModeChange = (
    event: MouseEvent<HTMLElement>,
    value: PaletteMode | null
  ) => {
    if (setMode && value) {
      setMode(value);
    }
  };

  return (
    <div>
      <Typography variant="body1">Theme</Typography>

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleThemeModeChange}
        aria-label="theme mode"
        fullWidth
      >
        <ToggleButton value="light" aria-label="light">
          <LightModeIcon />
          &nbsp;Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark">
          <DarkModeIcon />
          &nbsp;Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ThemeToggle;
