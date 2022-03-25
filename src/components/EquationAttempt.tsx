import {
  Equation,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from '../services/equation';
import Attempt from './Attempt';

type Props = {
  attempt: Equation;
  target: Equation;
};

const EquationAttempt = ({ attempt, target }: Props) => (
  <Attempt
    target={stringifyEquation(target)}
    attempt={stringifyEquation(attempt)}
    readOnlyValues={READ_ONLY_CHARACTERS}
  />
);

export default EquationAttempt;
