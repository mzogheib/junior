import { ReactNode, useState } from "react";

import AutoScrollToBottom from "./AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

type Props = {
  target: string;
  renderAttempts: (attempts: string[]) => ReactNode;
  renderInput: (
    onError: (value: string) => void,
    onSubmit: (value: string) => void
  ) => ReactNode;
};

const GameLayout = ({ target, renderAttempts, renderInput }: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed = !!lastAttempt && lastAttempt === target;

  const handleSubmit = (attempt: string) => {
    setError("");

    setAttempts(attempts.concat([attempt]));
  };

  return (
    <>
      {renderAttempts(attempts)}
      {!didSucceed && renderInput(setError, handleSubmit)}
      {didSucceed && <SuccessMessage numAttempts={attempts.length} />}

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
