import react from 'react';
import styled, { css } from 'styled-components';

type State = 'match' | 'present' | 'absent';

const stateMap = {
  match: '#91C483',
  present: '#FFE162',
  absent: '#FF6464',
};

type WrapperProps = {
  state: State;
};

const Wrapper = styled.span<WrapperProps>(
  ({ state }) => css`
    width: 50px;
    height: 50px;
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
  state: State;
};

const LetterTile = ({ letter, state }: Props) => {
  return <Wrapper state={state}>{letter}</Wrapper>;
};

export default LetterTile;
