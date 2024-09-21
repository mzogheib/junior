import { ThemeProps } from "@/components/Theme/types";

export const spacing =
  (value: number) =>
  ({ theme }: ThemeProps) =>
    theme.spacing(value);
