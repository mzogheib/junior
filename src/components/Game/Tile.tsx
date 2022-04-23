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
  [TileState.ReadOnly]: "transparent",
};

type Props = {
  state?: TileState;
};

const getWidth = ({ state }: Props) => {
  if (state === TileState.ReadOnly) {
    return 25;
  }

  return 50;
};

const Tile = styled.div<Props>`
  max-width: ${getWidth}px;
  height: 50px;
  width: 100%;
  border: 1px transparent solid;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: 0 2px;

  color: black;
  background-color: ${({ state }) => state && stateMap[state]};
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tile;
