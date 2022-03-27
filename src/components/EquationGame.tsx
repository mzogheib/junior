import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

import {
  Equation,
  isValidEquation,
  stringifyEquation,
} from '../services/equation';
import { usePrevious } from '../misc/utils';
import EquationAttempts from './EquationAttempts';
import EquationInputForm from './EquationInputForm';
import AutoScrollToBottom from './AutoScrollToBottom';

type Props = {
  target: Equation;
  onSuccess: (numAttempts: number) => void;
};

const EquationGame = ({ target, onSuccess }: Props) => {
  const [atempts, setAttempts] = useState<Equation[]>([]);
  const [error, setError] = useState('');

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: Equation) => {
    setError('');

    if (isValidEquation(attempt)) {
      setAttempts(atempts.concat([attempt]));
      return;
    }

    setError('Invalid equation');
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
        <EquationInputForm equation={target} onSubmit={handleSubmit} />
      )}

      {error && (
        <>
          <br />
          <Alert severity="error">{error}</Alert>
        </>
      )}

      <AutoScrollToBottom />
    </>
  );
};

export default EquationGame;
