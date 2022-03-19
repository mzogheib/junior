import styled from '@emotion/styled';
import Attempt from './Attempt';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  target: string;
  attempts: string[];
};

const Attempts = ({ target, attempts }: Props) => (
  <Wrapper>
    {attempts.map((attempt, i) => (
      <Attempt key={`${attempt}-${i}`} attempt={attempt} target={target} />
    ))}
  </Wrapper>
);

export default Attempts;
