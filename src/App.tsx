import { useState } from "react";
import styled from "@emotion/styled";

import SuccessMessage from "./components/SuccessMessage";
import { getRandomWord } from "./services/words";
import AppHeader from "./components/AppHeader";
import { Equation, getRandomEquation } from "./services/equation";
import { GameMode } from "./misc/types";
import EquationGame from "./components/EquationGame";
import WordGame from "./components/WordGame";
import NewGameDialog from "./components/NewGameDialog";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

const App = () => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);

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
      const newTarget = await getRandomWord(5);
      setTargetWord(newTarget);
      setTargetEquation(undefined);
    }

    setNumSuccessAttempts(0);

    setIsLoading(false);
    setIsNewGameDialogOpen(false);
  };

  const handleCancelNewGame = () => {
    // Cannot avoid creating the first game
    const isFirstGame = !targetEquation && !targetWord;
    if (isFirstGame) {
      return;
    }

    return () => setIsNewGameDialogOpen(false);
  };

  return (
    <>
      <Wrapper>
        <AppHeader
          isLoading={isLoading}
          onNewGame={() => setIsNewGameDialogOpen(true)}
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
        </Main>
        {!!numSuccessAttempts && (
          <SuccessMessage numAttempts={numSuccessAttempts} />
        )}
      </Wrapper>

      <NewGameDialog
        isOpen={isNewGameDialogOpen}
        isLoading={isLoading}
        onSubmit={handleNewGame}
        onCancel={handleCancelNewGame()}
      />
    </>
  );
};

export default App;
