import { ReactNode, useEffect, useState } from "react";

import AutoScrollToBottom from "./AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";

type Props = {
  target: string;
  renderAttempts: (attempts: string[]) => ReactNode;
  renderInput: (
    onError: (value: string) => void,
    onSubmit: (value: string) => void
  ) => ReactNode;
  onSuccess: (numAttempts: number) => void;
};

const GameLayout = ({
  target,
  renderAttempts,
  renderInput,
  onSuccess,
}: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed = !!lastAttempt && lastAttempt === target;

  useEffect(() => {
    if (didSucceed) {
      onSuccess(attempts.length);
    }
  }, [didSucceed, attempts.length, onSuccess]);

  const handleSubmit = (attempt: string) => {
    setError("");

    setAttempts(attempts.concat([attempt]));
  };

  return (
    <>
      {renderAttempts(attempts)}
      {!didSucceed && renderInput(setError, handleSubmit)}
      {error && (
        <>
          <br />
          <ErrorMessage error={error} />
        </>
      )}

      <AutoScrollToBottom />
    </>
  );
};

export default GameLayout;
