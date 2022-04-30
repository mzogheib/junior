import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import Tile from "./Tile";

type ThemeProps = {
  theme: Theme;
};

type OwnProps = {
  isFocussed?: boolean;
  isError?: boolean;
};

type Props = ThemeProps & OwnProps;

const borderWidth = ({ isFocussed }: Props) => (isFocussed ? "2px" : "1px");

const borderColor = ({ theme, isFocussed, isError }: Props) => {
  if (isError) {
    return "#FF6464";
  }

  const focussedConfig = {
    light: "black",
    dark: "white",
  };

  return isFocussed ? focussedConfig[theme.palette.mode] : "gray";
};

const color = ({ theme, isError }: Props) => {
  if (isError) {
    return "#FF6464";
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const InputTile = styled(Tile)<OwnProps>`
  border: ${borderWidth} ${borderColor} solid;
  color: ${color};
`;

export default InputTile;
