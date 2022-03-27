import { useEffect, useState } from 'react';

import { usePrevious } from '../misc/utils';
import AttemptInput from './AttemptInput';
import Attempts from './Attempts';
import AutoScrollToBottom from './AutoScrollToBottom';

type Props = {
  target: string;
  onSuccess: (numAttempts: number) => void;
};

const WordGame = ({ target, onSuccess }: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: string) => {
    setAttempts(attempts.concat([attempt]));
  };

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed = !!lastAttempt && lastAttempt === target;

  useEffect(() => {
    if (didSucceed) {
      onSuccess(attempts.length);
    }
  }, [didSucceed, attempts.length, onSuccess]);

  return (
    <>
      {!!attempts.length && !!target && (
        <Attempts attempts={attempts} target={target} />
      )}
      {!didSucceed && (
        <AttemptInput length={target.length} onSubmit={handleSubmit} />
      )}
      <AutoScrollToBottom />
    </>
  );
};

export default WordGame;
