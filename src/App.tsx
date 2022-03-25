import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import ResultModal from './components/ResultModal';
import AutoScrollToBottom from './components/AutoScrollToBottom';
import { getRandomWord } from './services/words';
import AppHeader from './components/AppHeader';
import { Equation, getRandomEquation } from './services/equation';
import {
  GameMode,
  useGameSettings,
} from './components/GameSettings/GameSettingsProvider';
import EquationGame from './components/EquationGame';
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
  const { gameMode } = useGameSettings();

  const [numSuccessAttempts, setNumSuccessAttempts] = useState(0);
  const [targetEquation, setTargetEquation] = useState<Equation>();
  const [targetWord, setTargetWord] = useState<string>();

  const handleNewGame = useCallback(async () => {
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
  }, [gameMode]);

  useEffect(() => {
    handleNewGame();
  }, [handleNewGame]);

  return (
    <>
      <Wrapper>
        <AppHeader onNewGame={handleNewGame} />

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
        numAttempts={numSuccessAttempts}
        onAccept={handleNewGame}
      />
    </>
  );
};

export default App;
