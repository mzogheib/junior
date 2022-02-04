import React from 'react';
import styled, { css } from 'styled-components';

export enum TileState {
  Match,
  Present,
  Absent,
}

const stateMap = {
  [TileState.Match]: '#91C483',
  [TileState.Present]: '#FFE162',
  [TileState.Absent]: '#FF6464',
};

type WrapperProps = {
  state: TileState;
};

const Wrapper = styled.span<WrapperProps>(
  ({ state }) => css`
    width: 50px;
    height: 50px;
    border: 1px transparent solid;
    margin: 0 2px;

    color: black;
    background-color: ${stateMap[state]};
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  `
);

type Props = {
  letter: string;
  state: TileState;
};

const Tile = ({ letter, state }: Props) => {
  return <Wrapper state={state}>{letter}</Wrapper>;
};

export default Tile;
