import { useState } from "react";
import styled from "@emotion/styled";

import { getRandomWord } from "./services/words";
import AppHeader from "./components/AppHeader";
import { stringifyTargetSegments, TargetSegments } from "./services/segments";
import { getRandomEquation } from "./services/equation";
import { GameMode } from "./components/Game/types";
import Game from "./components/Game/Game";
import NewGameDialog from "./components/Game/NewGameDialog";

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

  const [targetSegments, setTargetSegments] = useState<TargetSegments>();

  const onNewGame = (newGameMode: GameMode, length: number) => {
    setIsLoading(true);

    if (newGameMode === GameMode.Numbers) {
      const newTargetSegments = getRandomEquation();
      setTargetSegments(newTargetSegments);
    } else {
      const newTarget = getRandomWord(length);
      setTargetSegments(newTarget);
    }

    setGameMode(newGameMode);
    setIsLoading(false);
  };

  return {
    targetSegments,
    isLoading,
    gameMode,
    onNewGame,
  };
};

const App = () => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);

  const { targetSegments, isLoading, gameMode, onNewGame } = useGame();

  const handleNewGame = (newGameMode: GameMode, length: number) => {
    onNewGame(newGameMode, length);
    setIsNewGameDialogOpen(false);
  };

  const handleCancelNewGame = () => {
    // Cannot avoid creating the first game
    const isFirstGame = !targetSegments;
    if (isFirstGame) {
      return;
    }

    return () => setIsNewGameDialogOpen(false);
  };

  const renderGame = () => {
    if (isLoading || !targetSegments?.length || !gameMode) {
      return;
    }

    // Add a key to force a re-mount when the target changes. This avoids
    // left over state from a previous game.
    const key = stringifyTargetSegments(targetSegments);
    return (
      <Game key={key} targetSegments={targetSegments} gameMode={gameMode} />
    );
  };

  return (
    <>
      <Wrapper>
        <AppHeader
          isLoading={isLoading}
          onNewGame={() => setIsNewGameDialogOpen(true)}
        />

        <Main>{renderGame()}</Main>
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
