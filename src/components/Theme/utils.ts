import { ThemeProps } from "./types";

export const spacing =
  (value: number) =>
  ({ theme }: ThemeProps) =>
    theme.spacing(value);
