import React from 'react';
import styled from '@emotion/styled';

export enum TileState {
  Match,
  Present,
  Absent,
  ReadOnly,
}

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee
const stateMap = {
  [TileState.Match]: '#91C483',
  [TileState.Present]: '#FFE162',
  [TileState.Absent]: '#FF6464',
  [TileState.ReadOnly]: '#CFCFCF',
};

type WrapperProps = {
  state: TileState;
};

const Wrapper = styled.div<WrapperProps>`
  width: 50px;
  height: 50px;
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

type Props = {
  value: string;
  state: TileState;
};

const Tile = ({ value, state }: Props) => {
  return <Wrapper state={state}>{value}</Wrapper>;
};

export default Tile;
