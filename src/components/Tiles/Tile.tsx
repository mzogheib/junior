import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import { TileState } from "./types";
import BaseTile from "./BaseTile";

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee
const backgroundColorMap = {
  [TileState.Match]: "#91C483",
  [TileState.Present]: "#FFE162",
  [TileState.Absent]: "#FF6464",
  [TileState.Error]: "transparent",
};

type OwnProps = {
  state?: TileState;
};

type ThemeProps = {
  theme: Theme;
};

type Props = OwnProps & ThemeProps;

const color = ({ state, theme }: Props) => {
  if (state === TileState.Error) {
    return "#FF6464";
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const backgroundColor = ({ state }: Props) =>
  state && backgroundColorMap[state];

const Tile = styled(BaseTile)<OwnProps>`
  color: ${color};
  background-color: ${backgroundColor};
`;

export default Tile;
