import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import AttemptInput from './components/AttemptInput';
import Tile, { TileState } from './components/Tile';
import Tiles from './components/Tiles';
import Attempts from './components/Attempts';
import Result from './components/Result';
import AutoScrollToBottom from './components/AutoScrollToBottom';

// https://colorhunt.co/palette/ffe162ff646491c483eeeeee

const TARGET_LENGTH = 5;
const POSITIONS = Array.from(Array(TARGET_LENGTH).keys());

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

const getTileState = (target: string, attempt: string, position: number) => {
  return target[position] === attempt[position]
    ? TileState.Match
    : target.includes(attempt[position])
    ? TileState.Present
    : TileState.Absent;
};

const makeRandomNumberString = () =>
  Math.random()
    .toString()
    .substring(2, TARGET_LENGTH + 2);

const App = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [target, setTarget] = useState('');

  useEffect(() => {
    setTarget(makeRandomNumberString());
  }, []);

  const handleSubmit = (attempt: string) => {
    setAttempts(attempts.concat([attempt]));
  };

  const handleReset = () => {
    setAttempts([]);
    setTarget(makeRandomNumberString());
  };

  const renderAttempt = (attempt: string) => (
    <Tiles>
      {POSITIONS.map((position) => (
        <Tile
          key={position}
          letter={attempt[position]}
          state={getTileState(target, attempt, position)}
        />
      ))}
    </Tiles>
  );

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed = lastAttempt === target;

  return (
    <Wrapper>
      <AppBar position="sticky">
        <Toolbar>
          <Button onClick={handleReset} color="inherit">
            new game
          </Button>
        </Toolbar>
      </AppBar>

      <Main>
        {!!attempts.length && (
          <Attempts>
            {attempts.map((attempt, i) => (
              <div key={`${attempt}-${i}`}>{renderAttempt(attempt)}</div>
            ))}
          </Attempts>
        )}
        <AttemptInput onSubmit={handleSubmit} length={TARGET_LENGTH} />
        {didSucceed && <Result numAttempts={attempts.length} />}
        <AutoScrollToBottom />
      </Main>
    </Wrapper>
  );
};

export default App;
