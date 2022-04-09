import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const makeMessage = (numAttempts: number) => {
  if (numAttempts === 1) {
    return "Solved in 1 attempt";
  }

  return `Solved in ${numAttempts} attempts`;
};

type Props = {
  numAttempts: number;
};

const ResultModal = ({ numAttempts }: Props) => (
  <Wrapper>
    <Typography variant="h4" color="primary.main">
      🥳
    </Typography>
    <Typography variant="body1" color="primary.main">
      {makeMessage(numAttempts)}
    </Typography>
  </Wrapper>
);

export default ResultModal;
