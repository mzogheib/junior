import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import { TileState, TileColor } from "./types";
import BaseTile from "./BaseTile";

const backgroundColorMap = {
  [TileState.Match]: TileColor.Match,
  [TileState.Present]: TileColor.Present,
  [TileState.Absent]: TileColor.Absent,
};

type OwnProps = {
  isError?: boolean;
  state?: TileState;
};

type ThemeProps = {
  theme: Theme;
};

type Props = OwnProps & ThemeProps;

const color = ({ isError, theme }: Props) => {
  if (isError) {
    return TileColor.Absent;
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
