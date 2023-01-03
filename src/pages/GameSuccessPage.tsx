import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";

import { useNewGame } from "components/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import { useGame } from "components/Game/GameProvider";
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
  const { gameConfig } = useNewGame();
  const { targetSegments, mode } = gameConfig;

  const { attempts, gameStats } = useGame();

  if (!attempts.length) {
    return <Navigate to={paths.home} />;
  }

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
