import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Game from "components/Game/Game";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";

const GamePage = () => {
  const navigate = useNavigate();

  const { gameConfig } = useNewGame();

  useEffect(() => {
    if (!gameConfig) {
      navigate(paths.home);
    }
  }, [gameConfig, navigate]);

  if (!gameConfig) {
    return null;
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
