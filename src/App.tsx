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

const useGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>();
  const [isLoading, setIsLoading] = useState(false);
  const [numSuccessAttempts, setNumSuccessAttempts] = useState(0);

  const [target, setTarget] = useState<string | Equation>();

  const onNewGame = async (newGameMode: GameMode, length: number) => {
    setIsLoading(true);

    if (newGameMode === GameMode.Numbers) {
      const newTarget = await getRandomEquation();
      setTarget(newTarget);
    } else {
      const newTarget = await getRandomWord(length);
      setTarget(newTarget);
    }

    setNumSuccessAttempts(0);
    setGameMode(newGameMode);
    setIsLoading(false);
  };

  return {
    target:
      gameMode === GameMode.Numbers ? (target as Equation) : (target as string),
    numSuccessAttempts,
    isLoading,
    gameMode,
    onNewGame,
    setNumSuccessAttempts,
  };
};

const App = () => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);

  const {
    target,
    numSuccessAttempts,
    isLoading,
    gameMode,
    onNewGame,
    setNumSuccessAttempts,
  } = useGame();

  const handleNewGame = async (newGameMode: GameMode, length: number) => {
    onNewGame(newGameMode, length);
    setIsNewGameDialogOpen(false);
  };

  const handleCancelNewGame = () => {
    // Cannot avoid creating the first game
    const isFirstGame = !target;
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
          {gameMode === GameMode.Numbers && target?.length && (
            <EquationGame
              target={target as Equation}
              onSuccess={setNumSuccessAttempts}
            />
          )}
          {gameMode === GameMode.Letters && target?.length && (
            <WordGame
              target={target as string}
              onSuccess={setNumSuccessAttempts}
            />
          )}
        </Main>
        {!!numSuccessAttempts && (
          <SuccessMessage numAttempts={numSuccessAttempts} />
        )}
      </Wrapper>

      {isNewGameDialogOpen && (
        <NewGameDialog
          isLoading={isLoading}
          onSubmit={handleNewGame}
          onCancel={handleCancelNewGame()}
        />
      )}
    </>
  );
};

export default App;
