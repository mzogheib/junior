import { PaletteMode } from "@mui/material";
import { ThemeProps } from "components/Theme/types";

export const spacing =
  (value: number) =>
  ({ theme }: ThemeProps) =>
    theme.spacing(value);

export const setThemeColorMetaTag = (mode: PaletteMode) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (!metaThemeColor) return;

  const themeColor = mode === "light" ? "#1976d2" : "#121212";
  metaThemeColor.setAttribute("content", themeColor);
};
