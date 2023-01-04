import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";

import { useGameConfig } from "core/gameConfig";
import { useGameResult } from "core/gameResult";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import NewGameButton from "components/NewGame/NewGameButton";
import ShareGamePrompt from "components/ShareGame/ShareGamePrompt";
import SuccessMessage from "components/Game/SuccessMessage";
import { spacing } from "components/Theme/utils";
import AutoScrollToBottom from "components/AutoScrollToBottom";
import GameAttempts from "components/Game/GameAttempts";

const MessageWrapper = styled.div`
  margin-top: ${spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameSuccessPage = () => {
  const gameConfig = useGameConfig();
  const gameResult = useGameResult();

  if (!gameConfig || !gameResult) {
    return <Navigate to={paths.home} />;
  }

  const { targetSegments, mode } = gameConfig;
  const { attempts, gameStats } = gameResult;

  return (
    <PageWrapper>
      <PageWrapper.Inner>
        <GameAttempts attempts={attempts} targetSegments={targetSegments} />

        <MessageWrapper>
          <SuccessMessage attempts={attempts} gameConfig={gameConfig} />
          <br />
          <NewGameButton variant="contained" fullWidth={false} />
          <br />
          <ShareGamePrompt
            targetSegments={targetSegments}
            settings={{ mode }}
            stats={gameStats}
          />
        </MessageWrapper>

        <AutoScrollToBottom />
      </PageWrapper.Inner>
    </PageWrapper>
  );
};

export default GameSuccessPage;
