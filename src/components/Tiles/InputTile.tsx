import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import Tile from "./Tile";
import { ComponentProps } from "react";

type OwnProps = {
  isFocussed?: boolean;
};

type ThemeProps = {
  theme: Theme;
};

type Props = ThemeProps & OwnProps & ComponentProps<typeof Tile>;

const borderWidth = ({ isFocussed }: Props) => (isFocussed ? "3px" : "1px");

const color = ({ theme, state }: Props) => {
  // The Tile component will handle it
  if (state) {
    return;
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const InputTile = styled(Tile)<OwnProps>`
  border: ${borderWidth} ${color} solid;
  color: ${color};
`;

export default InputTile;
