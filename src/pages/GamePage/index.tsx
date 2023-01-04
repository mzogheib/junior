import { Navigate, useNavigate } from "react-router-dom";

import { useGameConfig } from "core/gameConfig";
import { paths } from "pages/PageRouter";
import PageWrapper from "pages/PageWrapper";
import Game from "./Game";
import { GameResult } from "components/Game/types";
import { useSetGameResult } from "core/gameResult";

const GamePage = () => {
  const navigate = useNavigate();

  const gameConfig = useGameConfig();
  const setGameResult = useSetGameResult();

  if (!gameConfig) {
    return <Navigate to={paths.home} />;
  }

  const handleGameCompleted = (result: GameResult) => {
    setGameResult(result);
    navigate(paths.gameSuccess);
  };

  return (
    <PageWrapper>
      <Game gameConfig={gameConfig} onGameCompleted={handleGameCompleted} />
    </PageWrapper>
  );
};

export default GamePage;
