import { PaletteMode } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { setMode, mode } = useTheme();

  const handleThemeModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: PaletteMode | null
  ) => {
    if (setMode && value) {
      setMode(value);
    }
  };

  return (
    <div>
      <Typography variant="body1" color="primary.main">
        Mode
      </Typography>

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleThemeModeChange}
        aria-label="theme mode"
      >
        <ToggleButton value="light" aria-label="light">
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark">
          Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ThemeToggle;
