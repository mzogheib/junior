import { useNavigate, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCustomGame } from "components/Game/ShareGame/utils";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import Attempt from "components/Game/Attempt";
import { spacing } from "components/Theme/utils";
import { GameMode } from "components/Game/types";
import { CHARACTER_DISPLAY_MAP, SegmentType } from "services/segments";
import { makeDuration } from "components/Game/utils";

const Wrapper = styled.div`
  padding: ${spacing(2)};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

  const target = targetSegments.map((segment) => segment.value).join("");

  const readOnlyValues = targetSegments
    .filter((segment) => segment.type === SegmentType.ReadOnly)
    .map((segment) => segment.value);

  const attempt = targetSegments
    .map((segment) => {
      if (segment.type === SegmentType.Writeable) {
        const newValue = segment.value
          .split("")
          .map((_) => "?")
          .join("");
        return { ...segment, value: newValue };
      }
      return segment;
    })
    .map((segment) => segment.value)
    .join("");

  return (
    <PageWrapper>
      <Wrapper>
        <Attempt
          target={target}
          attempt={attempt}
          readOnlyValues={readOnlyValues}
          characterMap={CHARACTER_DISPLAY_MAP}
        />

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
      </Wrapper>
    </PageWrapper>
  );
};

export default CustomGamePage;
