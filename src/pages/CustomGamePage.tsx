import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import { useCustomGame } from "misc/customGame";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import Attempt from "components/Game/Attempt";
import { spacing } from "components/Theme/utils";
import { GameMode } from "components/Game/types";
import { CHARACTER_DISPLAY_MAP, SegmentType } from "services/segments";

const Wrapper = styled(Paper)`
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

  if (!initialConfig.config) {
    return null;
  }

  const { mode, targetSegments } = initialConfig.config;

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
      <Wrapper elevation={0}>
        <Attempt
          target={target}
          attempt={attempt}
          readOnlyValues={readOnlyValues}
          characterMap={CHARACTER_DISPLAY_MAP}
        />

        <br />

        <Typography variant="body1">You've been challenged!</Typography>

        <Typography variant="body1">Can you solve this {gameMode}?</Typography>

        <br />

        <Button variant="contained" onClick={handleClick}>
          Go
        </Button>
      </Wrapper>
    </PageWrapper>
  );
};

export default CustomGamePage;
