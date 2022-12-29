import Game from "components/Game/Game";
import NewGameDialog from "components/Game/NewGame/NewGameDialog";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";

const App = () => {
  const { gameConfig, isNewGameDialogOpen } = useNewGame();

  const renderGame = () => {
    if (!gameConfig) {
      return;
    }

    // Add a key to force a re-mount when the game changes. This avoids
    // left over state from a previous game.
    return <Game key={gameConfig.startedAt} config={gameConfig} />;
  };

  return (
    <PageWrapper>
      {renderGame()}

      {isNewGameDialogOpen && <NewGameDialog />}
    </PageWrapper>
  );
};

export default App;
