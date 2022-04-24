import { useState } from "react";
import styled from "@emotion/styled";

import { Attempt, GameConfig } from "./types";
import {
  stringifyTargetSegments,
  READ_ONLY_CHARACTERS,
  CHARACTER_DISPLAY_MAP,
  TargetSegments,
} from "../../services/segments";
import Attempts from "./Attempts";

import AutoScrollToBottom from "../AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import InputForm from "./InputForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const checkDidSucceed = (attempts: string[], target: string) => {
  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;

  return !!lastAttempt && lastAttempt === target;
};

type Props = {
  config: GameConfig;
};

const Game = ({ config }: Props) => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState("");

  const attemptsValues = attempts.map(({ value }) => value);
  const { targetSegments, mode, validate } = config;
  const target = stringifyTargetSegments(targetSegments);
  const didSucceed = checkDidSucceed(attemptsValues, target);

  const handleValidate = (attemptSegments: TargetSegments) => {
    const error = validate(attemptSegments);

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  const handleSubmit = (attempt: string) => {
    setError("");
    setAttempts(attempts.concat([{ value: attempt, submittedAt: Date.now() }]));
  };

  return (
    <Wrapper>
      {!!attempts.length && (
        <Attempts
          attempts={attemptsValues}
          target={stringifyTargetSegments(targetSegments)}
          readOnlyValues={READ_ONLY_CHARACTERS}
          characterMap={CHARACTER_DISPLAY_MAP}
        />
      )}

      {!didSucceed && (
        <InputForm
          mode={mode}
          targetSegments={targetSegments}
          onSubmit={handleSubmit}
          onValidate={handleValidate}
        />
      )}

      {didSucceed && <SuccessMessage numAttempts={attempts.length} />}

      {error && (
        <>
          <br />
          <ErrorMessage error={error} />
        </>
      )}

      <AutoScrollToBottom />
    </Wrapper>
  );
};

export default Game;
