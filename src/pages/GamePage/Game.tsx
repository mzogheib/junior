import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  stringifyTargetSegments,
  TargetSegments,
  getWriteableSegments,
  getUniqueSegmentValueChars,
} from "@/services/segments";
import AutoScrollToBottom from "@/components/AutoScrollToBottom";
import ErrorMessage from "@/components/Game/ErrorMessage";
import Keyboard from "@/components/Input/Keyboard";
import InputTiles from "@/components/Tiles/InputTiles";
import { spacing } from "@/components/Theme/utils";
import PageWrapper from "@/pages/PageWrapper";
import { checkIsComplete, checkDidSucceed } from "./utils";
import GameAttempts from "@/components/Game/GameAttempts";
import { Attempt, GameConfig, GameResult } from "@/components/Game/types";
import { useStopwatch } from "@/misc/timer";
import Stopwatch from "@/components/Stopwatch";

const MessageWrapper = styled.div`
  margin-top: ${spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StopwatchWrapper = styled.div`
  margin-top: ${spacing(3)};
`;

type Props = {
  gameConfig: GameConfig;
  onGameCompleted: (result: GameResult) => void;
};

const Game = ({ gameConfig, onGameCompleted }: Props) => {
  const { targetSegments, startedAt, mode, validate } = gameConfig;

  const [absentKeys, setAbsentKeys] = useState<string[]>([]);
  const [attemptSegments, setAttemptSegments] = useState<TargetSegments>();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string>();

  const { time, start, stop } = useStopwatch();

  useEffect(() => {
    start();
  }, [start]);

  const writeableSegments =
    attemptSegments && getWriteableSegments(attemptSegments);
  const inputValue =
    writeableSegments && stringifyTargetSegments(writeableSegments);

  const handleValidate = useCallback(
    (attemptSegments: TargetSegments) => {
      const error = validate(attemptSegments);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    },
    [setError, validate]
  );

  const isComplete =
    attemptSegments && checkIsComplete(attemptSegments, targetSegments);

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

    setAttemptSegments(undefined);
    setError(undefined);
  };

  const didSucceed = checkDidSucceed(attempts, targetSegments);

  useEffect(() => {
    if (didSucceed) {
      const numAttempts = attempts.length;
      const finishedAt = attempts[numAttempts - 1]?.submittedAt;
      const gameStats = { startedAt, finishedAt, numAttempts };

      stop();
      onGameCompleted({ attempts, gameStats });
    }
  }, [attempts, didSucceed, onGameCompleted, startedAt, stop]);

  return (
    <>
      <PageWrapper.Inner>
        <GameAttempts attempts={attempts} targetSegments={targetSegments} />

        <InputTiles
          inputValue={inputValue || ""}
          targetSegments={targetSegments}
        />

        <StopwatchWrapper>
          <Stopwatch time={time} />
        </StopwatchWrapper>

        {error && (
          <MessageWrapper>
            <ErrorMessage error={error} />
          </MessageWrapper>
        )}

        <AutoScrollToBottom />
      </PageWrapper.Inner>

      <Keyboard
        // A hacky way to remount the keyboard to clear old input
        key={attempts.length}
        mode={mode}
        targetSegments={targetSegments}
        onChange={handleChange}
        onEnter={handleSubmit}
        mutedKeys={absentKeys}
      />
    </>
  );
};

export default Game;
