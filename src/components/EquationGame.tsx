import React, { useEffect, useState } from 'react';

import { Equation, stringifyEquation } from '../services/equation';
import { usePrevious } from '../utils';
import EquationAttempts from './EquationAttempts';
import EquationInput from './EquationInput';

type Props = {
  target: Equation;
  onSuccess: (numAttempts: number) => void;
};

const EquationGame = ({ target, onSuccess }: Props) => {
  const [atempts, setAttempts] = useState<Equation[]>([]);

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: Equation) => {
    setAttempts(atempts.concat([attempt]));
  };

  const lastAttempt = atempts.length ? atempts[atempts.length - 1] : undefined;
  const didSucceed =
    !!lastAttempt &&
    stringifyEquation(lastAttempt) === stringifyEquation(target);

  useEffect(() => {
    if (didSucceed) {
      onSuccess(atempts.length);
    }
  }, [didSucceed, atempts.length, onSuccess]);

  return (
    <>
      {!!atempts.length && !!target && (
        <EquationAttempts attempts={atempts} target={target} />
      )}
      {!didSucceed && target && (
        <EquationInput equation={target} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default EquationGame;