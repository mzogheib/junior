import styled from "@emotion/styled";

export enum TileState {
  Match = "match",
  Present = "present",
  Absent = "absent",
  ReadOnly = "readOnly",
}

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee
const stateMap = {
  [TileState.Match]: "#91C483",
  [TileState.Present]: "#FFE162",
  [TileState.Absent]: "#FF6464",
  [TileState.ReadOnly]: "#CFCFCF",
};

type Props = {
  state?: TileState;
};

const Tile = styled.div<Props>`
  max-width: 50px;
  height: 50px;
  width: 100%;
  border: 1px transparent solid;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: 0 2px;

  color: black;
  background-color: ${({ state }) => state && stateMap[state]};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tile;
