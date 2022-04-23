import { useState } from "react";
import styled from "@emotion/styled";

import AppHeader from "./components/AppHeader";
import { stringifyTargetSegments } from "./services/segments";
import { GameMode } from "./components/Game/types";
import Game from "./components/Game/Game";
import NewGameDialog from "./components/Game/NewGameDialog";
import useNewGame from "./components/Game/useNewGame";

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
  const { targetSegments, isLoading, gameMode, onNewGame } = useNewGame();

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
