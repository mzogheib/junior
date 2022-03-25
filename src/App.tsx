import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import ResultModal from './components/ResultModal';
import AutoScrollToBottom from './components/AutoScrollToBottom';
import { getRandomWord } from './services/words';
import AppHeader from './components/AppHeader';
import WordGame from './components/WordGame';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

const App = () => {
  const [numSuccessAttempts, setNumSuccessAttempts] = useState(0);
  const [targetWord, setTargetWord] = useState<string>();

  const handleReset = async () => {
    const newTarget = await getRandomWord();
    setTargetWord(newTarget);
    setNumSuccessAttempts(0);
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <>
      <Wrapper>
        <AppHeader onNewGame={handleReset} />

        <Main>
          {targetWord?.length && (
            <WordGame target={targetWord} onSuccess={setNumSuccessAttempts} />
          )}
          <AutoScrollToBottom />
        </Main>
      </Wrapper>

      <ResultModal
        isOpen={!!numSuccessAttempts}
        numAttempts={numSuccessAttempts}
        onAccept={handleReset}
      />
    </>
  );
};

export default App;
