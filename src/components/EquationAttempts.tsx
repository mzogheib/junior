import styled from '@emotion/styled';

import {
  Equation,
  mapOperatorCharacter,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from '../services/equation';
import Attempt from './Attempt';
import { TileSize } from './Tile';

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
      <Attempt
        key={index}
        target={stringifyEquation(target)}
        attempt={stringifyEquation(attempt)
          .split('')
          .map(mapOperatorCharacter)
          .join('')}
        readOnlyValues={READ_ONLY_CHARACTERS}
        size={TileSize.Small}
      />
    ))}
  </Wrapper>
);

export default EquationAttempts;
