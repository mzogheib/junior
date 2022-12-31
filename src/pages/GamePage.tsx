import { Navigate } from "react-router-dom";

import Game from "components/Game/Game";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";

const GamePage = () => {
  const { gameConfig } = useNewGame();

  if (!gameConfig) {
    return <Navigate to={paths.home} />;
  }

  // Add a key to force a re-mount when the game changes. This avoids
  // left over state from a previous game.
  return (
    <PageWrapper>
      <Game key={gameConfig.startedAt} config={gameConfig} />
    </PageWrapper>
  );
};

export default GamePage;
