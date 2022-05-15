import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Attempt, GameConfig } from "./types";
import {
  stringifyTargetSegments,
  READ_ONLY_CHARACTERS,
  CHARACTER_DISPLAY_MAP,
  TargetSegments,
  makeAttemptSegments,
  getWriteableSegments,
  getUniqueSegmentValueChars,
} from "../../services/segments";
import Attempts from "./Attempts";

import AutoScrollToBottom from "../AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import Keyboard from "../Input/Keyboard";
import InputTiles from "../Tiles/InputTiles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Inner = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
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
  const { targetSegments, mode, validate } = config;
  const initialAttempt = makeAttemptSegments("", targetSegments);
  const [absentKeys, setAbsentKeys] = useState<string[]>([]);

  const [attemptSegments, setAttemptSegments] =
    useState<TargetSegments>(initialAttempt);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState("");

  const attemptsValues = attempts.map(({ value }) => value);
  const target = stringifyTargetSegments(targetSegments);
  const didSucceed = checkDidSucceed(attemptsValues, target);

  const writeableSegments = getWriteableSegments(attemptSegments);
  const inputValue = stringifyTargetSegments(writeableSegments);

  const attemptLength = stringifyTargetSegments(attemptSegments).length;
  const targetLength = stringifyTargetSegments(targetSegments).length;
  const isComplete = attemptLength === targetLength;

  const handleValidate = useCallback(
    (attemptSegments: TargetSegments) => {
      const error = validate(attemptSegments);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    },
    [validate]
  );

  useEffect(() => {
    if (isComplete) {
      handleValidate(attemptSegments);
    }
  }, [attemptSegments, handleValidate, isComplete]);

  const handleChange = (newAttemptSegments: TargetSegments) => {
    setAttemptSegments(newAttemptSegments);
    setError("");
  };

  const handleSubmit = () => {
    if (!isComplete) {
      return;
    }

    if (!handleValidate(attemptSegments)) {
      return;
    }

    const value = stringifyTargetSegments(attemptSegments);
    const submittedAt = new Date().toISOString();
    setAttempts(attempts.concat([{ value, submittedAt }]));

    const targetValues = getUniqueSegmentValueChars(targetSegments);
    const attemptValues = getUniqueSegmentValueChars(attemptSegments);
    const newAbsentKeys = attemptValues.filter(
      (value) => !targetValues.includes(value)
    );

    setAbsentKeys(absentKeys.concat(newAbsentKeys));

    setAttemptSegments(initialAttempt);
    setError("");
  };

  return (
    <Wrapper>
      <Inner>
        {!!attempts.length && (
          <Attempts
            attempts={attemptsValues}
            target={stringifyTargetSegments(targetSegments)}
            readOnlyValues={READ_ONLY_CHARACTERS}
            characterMap={CHARACTER_DISPLAY_MAP}
          />
        )}

        {!didSucceed && (
          <InputTiles inputValue={inputValue} targetSegments={targetSegments} />
        )}

        {didSucceed && (
          <SuccessMessage attempts={attempts} gameConfig={config} />
        )}

        {error && (
          <>
            <br />
            <ErrorMessage error={error} />
          </>
        )}

        <AutoScrollToBottom />
      </Inner>

      {!didSucceed && (
        <Keyboard
          // A hacky way to remount the keyboard to clear old input
          key={attempts.length}
          mode={mode}
          targetSegments={targetSegments}
          onChange={handleChange}
          onEnter={handleSubmit}
          mutedKeys={absentKeys}
        />
      )}
    </Wrapper>
  );
};

export default Game;
