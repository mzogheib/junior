import { useState } from 'react';
import styled from '@emotion/styled';

import ResultModal from './components/Modals/ResultModal';
import AutoScrollToBottom from './components/AutoScrollToBottom';
import { getRandomWord } from './services/words';
import AppHeader from './components/AppHeader';
import { Equation, getRandomEquation } from './services/equation';
import { GameMode } from './components/GameSettings/GameSettingsProvider';
import EquationGame from './components/EquationGame';
import WordGame from './components/WordGame';
import NewGameModal from './components/Modals/NewGameModal';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

const App = () => {
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(true);

  const [numSuccessAttempts, setNumSuccessAttempts] = useState(0);
  const [targetEquation, setTargetEquation] = useState<Equation>();
  const [targetWord, setTargetWord] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);

  const handleNewGame = async (gameMode: GameMode) => {
    setIsLoading(true);

    if (gameMode === GameMode.Numbers) {
      const newTarget = await getRandomEquation();
      setTargetEquation(newTarget);
      setTargetWord(undefined);
    } else {
      const newTarget = await getRandomWord();
      setTargetWord(newTarget);
      setTargetEquation(undefined);
    }

    setNumSuccessAttempts(0);

    setIsLoading(false);
    setIsNewGameModalOpen(false);
  };

  const handleCloseResultsModal = () => {
    setNumSuccessAttempts(0);
    setIsNewGameModalOpen(true);
  };

  return (
    <>
      <Wrapper>
        <AppHeader
          isLoading={isLoading}
          onNewGame={() => setIsNewGameModalOpen(true)}
        />

        <Main>
          {targetEquation?.length && (
            <EquationGame
              target={targetEquation}
              onSuccess={setNumSuccessAttempts}
            />
          )}
          {targetWord?.length && (
            <WordGame target={targetWord} onSuccess={setNumSuccessAttempts} />
          )}
          <AutoScrollToBottom />
        </Main>
      </Wrapper>

      <ResultModal
        isOpen={!!numSuccessAttempts}
        isLoading={isLoading}
        numAttempts={numSuccessAttempts}
        onAccept={handleCloseResultsModal}
      />
      <NewGameModal
        isOpen={isNewGameModalOpen}
        isLoading={isLoading}
        onSubmit={handleNewGame}
      />
    </>
  );
};

export default App;
