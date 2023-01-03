import { useNavigate, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCustomGame } from "components/ShareGame/utils";
import { useNewGame } from "components/NewGame/NewGameProvider";
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

  const initialConfig = useCustomGame();
  const { setGameConfig } = useNewGame();

  const handleClick = () => {
    if (!initialConfig.config) return;

    setGameConfig(initialConfig.config);
    navigate(paths.game);
  };

  if (!initialConfig.config || !initialConfig.stats) {
    return <Navigate to={paths.home} />;
  }

  const { mode, targetSegments } = initialConfig.config;
  const { startedAt, finishedAt } = initialConfig.stats;
  const duration = makeDuration(startedAt, finishedAt);

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
          Can you solve this {gameMode} {duration}?
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
