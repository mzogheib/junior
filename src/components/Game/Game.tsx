import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Attempt, GameConfig } from "components/Game/types";
import {
  stringifyTargetSegments,
  READ_ONLY_CHARACTERS,
  CHARACTER_DISPLAY_MAP,
  TargetSegments,
  makeAttemptSegments,
  getWriteableSegments,
  getUniqueSegmentValueChars,
} from "services/segments";
import Attempts from "components/Game/Attempts";
import AutoScrollToBottom from "components/AutoScrollToBottom";
import ErrorMessage from "components/Game/ErrorMessage";
import SuccessMessage from "components/Game/SuccessMessage";
import Keyboard from "components/Input/Keyboard";
import InputTiles from "components/Tiles/InputTiles";
import { spacing } from "components/Theme/utils";
import NewGameButton from "components/Game/NewGame/NewGameButton";
import ShareGamePrompt from "components/Game/ShareGame/ShareGamePrompt";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Inner = styled.div`
  padding: ${spacing(2)};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const MessageWrapper = styled.div`
  margin-top: ${spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
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

  const numAttempts = attempts.length;
  const finishedAt = attempts[numAttempts - 1]?.submittedAt;
  const gameStats = { startedAt: config.startedAt, finishedAt, numAttempts };

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
          <MessageWrapper>
            <SuccessMessage attempts={attempts} gameConfig={config} />
            <br />
            <NewGameButton variant="contained" fullWidth={false} />
            <br />
            <ShareGamePrompt
              targetSegments={targetSegments}
              settings={{ mode }}
              stats={gameStats}
            />
          </MessageWrapper>
        )}

        {error && (
          <MessageWrapper>
            <ErrorMessage error={error} />
          </MessageWrapper>
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
