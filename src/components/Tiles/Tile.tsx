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
  state?: TileState;
};

type Props = OwnProps & ThemeProps;

const backgroundColor = ({ state }: Props) =>
  state && backgroundColorMap[state];

const Tile = styled(BaseTile)<OwnProps>`
  background-color: ${backgroundColor};
`;

export default Tile;
