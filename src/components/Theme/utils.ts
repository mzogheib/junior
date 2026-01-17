import { PaletteMode } from "@mui/material";
import { ThemeProps } from "components/Theme/types";
import { storage } from "misc/storage";

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

const isPaletteMode = (value: any): value is PaletteMode => {
  return value === "light" || value === "dark";
};

export const storePaletteMode = (mode: PaletteMode) => {
  storage.set("themeMode", mode);
};

export const getStoredPaletteMode = () => {
  const storedMode = storage.get("themeMode");

  if (isPaletteMode(storedMode)) return storedMode;

  return null;
};
