import styled from "@emotion/styled";

import AppHeader from "./components/AppHeader";
import { GameSettings } from "./components/Game/types";
import Game from "./components/Game/Game";
import NewGameDialog from "./components/Game/NewGameDialog";
import useNewGame from "./components/Game/useNewGame";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  flex-grow: 1;
`;

const App = () => {
  const {
    gameConfig,
    gameSettings,
    isNewGameDialogOpen,
    setIsNewGameDialogOpen,
    onNewGame,
  } = useNewGame();

  const handleSubmitNewGame = (
    newGameSettings: GameSettings,
    shouldSaveSettings: boolean
  ) => {
    onNewGame(newGameSettings, shouldSaveSettings);

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

  const handleClickNewGame = (isCustom?: boolean) => {
    if (gameSettings && !isCustom) {
      handleSubmitNewGame(gameSettings, true);
    } else {
      setIsNewGameDialogOpen(true);
    }
  };

  const renderGame = () => {
    if (!gameConfig) {
      return;
    }

    // Add a key to force a re-mount when the game changes. This avoids
    // left over state from a previous game.
    return <Game key={gameConfig.startedAt} config={gameConfig} />;
  };

  return (
    <>
      <Wrapper>
        <AppHeader
          hasSavedGameSettings={!!gameSettings}
          onNewGame={handleClickNewGame}
        />

        <Main>{renderGame()}</Main>
      </Wrapper>

      {isNewGameDialogOpen && (
        <NewGameDialog
          onSubmit={handleSubmitNewGame}
          onCancel={handleCancelNewGame()}
        />
      )}
    </>
  );
};

export default App;
