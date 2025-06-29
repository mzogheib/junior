import { useNavigate, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCustomGame } from "components/ShareGame/utils";
import { useSetGameConfig } from "sharedState/gameConfig";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import { GameMode } from "components/Game/types";
import {
  replaceSegmentValues,
  stringifyTargetSegments,
} from "services/segments";
import { makeDuration } from "components/Game/utils";
import GameAttempts from "components/Game/GameAttempts";

const gameModeMap = {
  [GameMode.Letters]: "word",
  [GameMode.Numbers]: "equation",
};

const CustomGamePage = () => {
  const navigate = useNavigate();

  const { config, stats, isLoading } = useCustomGame();
  const setGameConfig = useSetGameConfig();

  const handleClick = () => {
    if (!config) return;

    // The game starts as soon as the user clicks the button
    setGameConfig({
      ...config,
      startedAt: new Date().toISOString(),
    });
    navigate(paths.game);
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <PageWrapper.Inner>Loading...</PageWrapper.Inner>
      </PageWrapper>
    );
  }

  if (!config || !stats) {
    return <Navigate to={paths.home} />;
  }

  const { mode, targetSegments, isTimerVisible } = config;
  const { startedAt, finishedAt } = stats;
  const duration = isTimerVisible
    ? ` ${makeDuration(startedAt, finishedAt)}`
    : "";

  const gameMode = gameModeMap[mode];

  const fakeAttemptSegments = replaceSegmentValues(targetSegments, "?");
  const attemptValue = stringifyTargetSegments(fakeAttemptSegments);

  const attempts = [{ value: attemptValue, submittedAt: "" }];

  return (
    <PageWrapper>
      <PageWrapper.Inner>
        <GameAttempts attempts={attempts} targetSegments={targetSegments} />

        <br />

        <Typography color="textPrimary" variant="body1">
          You've been challenged!
        </Typography>

        <Typography color="textPrimary" variant="body1">
          Can you solve this {gameMode}
          {duration}?
        </Typography>

        <br />

        <Button variant="contained" onClick={handleClick}>
          Go
        </Button>
      </PageWrapper.Inner>
    </PageWrapper>
  );
};

export default CustomGamePage;
