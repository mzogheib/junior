import { useState } from "react";
import styled from "@emotion/styled";

import AppHeader from "./components/AppHeader";
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
  const { isLoading, gameConfig, onNewGame } = useNewGame();

  const handleNewGame = (newGameMode: GameMode, length: number) => {
    onNewGame(newGameMode, length);
    setIsNewGameDialogOpen(false);
  };

  const handleCancelNewGame = () => {
    // Cannot avoid creating the first game
    const isFirstGame = !gameConfig;
    if (isFirstGame) {
      return;
    }

    return () => setIsNewGameDialogOpen(false);
  };

  const renderGame = () => {
    if (isLoading || !gameConfig) {
      return;
    }

    // Add a key to force a re-mount when the game changes. This avoids
    // left over state from a previous game.
    const key = JSON.stringify(gameConfig);
    return <Game key={key} config={gameConfig} />;
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
