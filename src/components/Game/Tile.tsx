import styled from "@emotion/styled";

export enum TileState {
  Match,
  Present,
  Absent,
  ReadOnly,
}

export enum TileSize {
  Small,
  Default,
}

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee
const stateMap = {
  [TileState.Match]: "#91C483",
  [TileState.Present]: "#FFE162",
  [TileState.Absent]: "#FF6464",
  [TileState.ReadOnly]: "#CFCFCF",
};

type Props = {
  state: TileState;
  size?: TileSize;
};

const Tile = styled.div<Props>`
  width: ${({ size }) => (size === TileSize.Small ? "36px" : "50px")};
  height: ${({ size }) => (size === TileSize.Small ? "36px" : "50px")};
  border: 1px transparent solid;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: 0 2px;

  color: black;
  background-color: ${({ state }) => stateMap[state]};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tile;
