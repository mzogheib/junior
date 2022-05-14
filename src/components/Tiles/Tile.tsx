import styled from "@emotion/styled";

import { TileState, TileColor } from "./types";
import BaseTile from "./BaseTile";
import { ThemeProps } from "../Theme/types";

const backgroundColorMap = {
  [TileState.Match]: TileColor.Match,
  [TileState.Present]: TileColor.Present,
  [TileState.Absent]: TileColor.Absent,
};

type OwnProps = {
  isError?: boolean;
  state?: TileState;
};

type Props = OwnProps & ThemeProps;

const color = ({
  isError,
  theme: {
    palette: { mode, grey },
  },
}: Props) => {
  if (isError) {
    return TileColor.Absent;
  }

  return mode === "light" ? "black" : grey[800];
};

const backgroundColor = ({ state }: Props) =>
  state && backgroundColorMap[state];

const Tile = styled(BaseTile)<OwnProps>`
  color: ${color};
  background-color: ${backgroundColor};
`;

export default Tile;
