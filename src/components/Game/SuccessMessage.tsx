import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { Attempt, GameConfig } from "./types";
import { makeDuration } from "./utils";

const Wrapper = styled.div`
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
  <Wrapper>
    <Typography variant="h4">🥳</Typography>
    <Typography variant="body1" color="primary.main">
      {makeMessage(attempts, gameConfig)}
    </Typography>
  </Wrapper>
);

export default SuccessMessage;
