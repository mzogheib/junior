import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

export enum TileState {
  Match = "match",
  Present = "present",
  Absent = "absent",
  Error = "error",
}

export enum TileVariant {
  Default = "default",
  ReadOnly = "ReadOnly",
}

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee
const backgroundColorMap = {
  [TileState.Match]: "#91C483",
  [TileState.Present]: "#FFE162",
  [TileState.Absent]: "#FF6464",
  [TileState.Error]: "transparent",
};

type OwnProps = {
  variant?: TileVariant;
  state?: TileState;
};

type ThemeProps = {
  theme: Theme;
};

type Props = OwnProps & ThemeProps;

const width = ({ variant }: Props) => {
  if (variant === TileVariant.ReadOnly) {
    return 20;
  }

  return 40;
};

const color = ({ state, theme }: Props) => {
  if (state === TileState.Error) {
    return "#FF6464";
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const backgroundColor = ({ state }: Props) =>
  state && backgroundColorMap[state];

const borderColor = ({ state, variant, theme }: Props) => {
  if (variant === TileVariant.ReadOnly) {
    return "transparent";
  }

  if (state) {
    return backgroundColorMap[state];
  }

  return theme.palette.mode === "light" ? "black" : "white";
};

const borderRadius = ({ theme }: Props) => theme.shape.borderRadius;

const Tile = styled.div<OwnProps>`
  max-width: ${width}px;
  height: 40px;
  width: 100%;
  border: 1px ${borderColor} solid;
  border-radius: ${borderRadius}px;
  margin: 0 2px;

  color: ${color};
  background-color: ${backgroundColor};
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tile;
