import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import AttemptInput from './components/AttemptInput';
import Tile, { TileState } from './components/Tile';
import Tiles from './components/Tiles';
import Attempts from './components/Attempts';
import ResultModal from './components/ResultModal';
import AutoScrollToBottom from './components/AutoScrollToBottom';
import { getRandomWord } from './services/words';
import AppHeader from './components/AppHeader';

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

const App = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [target, setTarget] = useState('');

  const handleReset = async () => {
    const word = await getRandomWord();
    setTarget(word);
    setAttempts([]);
  };

  useEffect(() => {
    handleReset();
  }, []);

  const handleSubmit = (attempt: string) => {
    setAttempts(attempts.concat([attempt]));
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
    <>
      <Wrapper>
        <AppHeader onNewGame={handleReset} />

        <Main>
          {!!attempts.length && (
            <Attempts>
              {attempts.map((attempt, i) => (
                <div key={`${attempt}-${i}`}>{renderAttempt(attempt)}</div>
              ))}
            </Attempts>
          )}
          {!didSucceed && (
            <AttemptInput onSubmit={handleSubmit} length={TARGET_LENGTH} />
          )}
          <AutoScrollToBottom />
        </Main>
      </Wrapper>

      <ResultModal
        isOpen={didSucceed}
        numAttempts={attempts.length}
        onAccept={handleReset}
      />
    </>
  );
};

export default App;
