import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

import { usePrevious } from "../misc/utils";
import WordInputForm from "./WordInputForm";
import Attempts from "./Attempts";
import AutoScrollToBottom from "./AutoScrollToBottom";

type Props = {
  target: string;
  onSuccess: (numAttempts: number) => void;
};

const WordGame = ({ target, onSuccess }: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
      setError("");
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: string) => {
    setError("");

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
        <WordInputForm
          key={`${didChangeTarget}`}
          length={target.length}
          onSubmit={handleSubmit}
          onError={setError}
        />
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

export default WordGame;
