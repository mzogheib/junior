import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { Attempt, GameConfig } from "./types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const makeDuration = (startedAt: number, finishedAt: number) => {
  const durationInSeconds = Math.round((finishedAt - startedAt) / 1000);
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const leftOverSeconds = durationInSeconds % 60;

  if (durationInMinutes > 9) {
    return "and you took way too long!";
  }

  if (durationInMinutes === 0) {
    return `in ${leftOverSeconds}s`;
  }

  return `in ${durationInMinutes}m and ${leftOverSeconds}s`;
};

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
    <Typography variant="h4" color="primary.main">
      🥳
    </Typography>
    <Typography variant="body1" color="primary.main">
      {makeMessage(attempts, gameConfig)}
    </Typography>
  </Wrapper>
);

export default SuccessMessage;
