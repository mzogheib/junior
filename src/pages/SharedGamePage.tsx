import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSharedGame } from "components/Game/ShareGame/utils";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";
import Attempt from "components/Game/Attempt";
import { spacing } from "components/Theme/utils";
import { GameMode } from "components/Game/types";
import { SegmentType } from "services/segments";

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

const SharedGamePage = () => {
  const navigate = useNavigate();

  const initialConfig = useSharedGame();
  const { setGameConfig } = useNewGame();

  const handleClick = () => {
    if (!initialConfig) return;

    setGameConfig(initialConfig);
    navigate(paths.game);
  };

  if (!initialConfig) {
    return null;
  }

  console.log(initialConfig);

  const { mode, targetSegments } = initialConfig;

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

export default SharedGamePage;
