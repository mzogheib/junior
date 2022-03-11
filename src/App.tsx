import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import AttemptInput from './components/AttemptInput';
import Attempts from './components/Attempts';
import ResultModal from './components/ResultModal';
import AutoScrollToBottom from './components/AutoScrollToBottom';
import { getRandomWord, TARGET_LENGTH } from './services/words';
import AppHeader from './components/AppHeader';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

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
            <Attempts attempts={attempts} target={target} />
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
