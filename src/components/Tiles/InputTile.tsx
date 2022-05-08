import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import BaseTile from "./BaseTile";
import { TileColor } from "./types";

type OwnProps = {
  isFocussed?: boolean;
  isError?: boolean;
};

type ThemeProps = {
  theme: Theme;
};

type Props = ThemeProps & OwnProps;

const borderWidth = ({ isFocussed }: Props) => (isFocussed ? "3px" : "1px");

const color = ({ theme, isError }: Props) => {
  if (isError) {
    return TileColor.Absent;
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const InputTile = styled(BaseTile)<OwnProps>`
  color: ${color};
  border: ${borderWidth} ${color} solid;
`;

export default InputTile;