import { Navigate } from "react-router-dom";

import { useGameConfig } from "core/game";
import { paths } from "pages/PageRouter";
import PageWrapper from "pages/PageWrapper";
import Game from "./Game";

const GamePage = () => {
  const [gameConfig] = useGameConfig();

  if (!gameConfig) {
    return <Navigate to={paths.home} />;
  }

  return (
    <PageWrapper>
      <Game gameConfig={gameConfig} />
    </PageWrapper>
  );
};

export default GamePage;
