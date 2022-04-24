import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { Attempt, GameConfig } from "./types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const makeMessage = (attempts: Attempt[], gameConfig: GameConfig) => {
  const numAttempts = attempts.length;
  const lastAttempt = attempts[numAttempts - 1];
  const finishedAt = lastAttempt.submittedAt;
  const duration = finishedAt - gameConfig.startedAt;
  const durationInSeconds = Math.round(duration / 1000).toLocaleString();

  if (numAttempts === 1) {
    return `Solved in ${durationInSeconds}s with 1 attempt`;
  }

  return `Solved in ${durationInSeconds}s with ${numAttempts} attempts`;
};

type Props = {
  gameConfig: GameConfig;
  attempts: Attempt[];
};

const SuccessMessage = ({ attempts, gameConfig }: Props) => (
  <Wrapper>
    <Typography variant="h4" color="primary.main">
      🥳
    </Typography>
    <Typography variant="body1" color="primary.main">
      {makeMessage(attempts, gameConfig)}
    </Typography>
  </Wrapper>
);

export default SuccessMessage;
