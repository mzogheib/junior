import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { Attempt, GameConfig } from "components/Game/types";
import { makeDuration } from "components/Game/utils";

const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const makeMessage = (attempts: Attempt[], gameConfig: GameConfig) => {
  const numAttempts = attempts.length;
  const lastAttempt = attempts[numAttempts - 1];
  const duration = makeDuration(gameConfig.startedAt, lastAttempt.submittedAt);

  if (numAttempts === 1) {
    return `Solved with 1 attempt ${duration}`;
  }

  return `Solved with ${numAttempts} attempts ${duration}`;
};

type Props = {
  gameConfig: GameConfig;
  attempts: Attempt[];
};

const SuccessMessage = ({ attempts, gameConfig }: Props) => (
  <Wrapper elevation={0}>
    <Typography variant="h4">🥳</Typography>
    <Typography variant="body1">{makeMessage(attempts, gameConfig)}</Typography>
  </Wrapper>
);

export default SuccessMessage;
