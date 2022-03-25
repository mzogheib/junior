import styled from '@emotion/styled';

import { Equation } from '../services/equation';
import EquationAttempt from './EquationAttempt';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  target: Equation;
  attempts: Equation[];
};

const EquationAttempts = ({ target, attempts }: Props) => (
  <Wrapper>
    {attempts.map((attempt, index) => (
      <EquationAttempt key={index} attempt={attempt} target={target} />
    ))}
  </Wrapper>
);

export default EquationAttempts;
