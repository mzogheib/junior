import { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";

import {
  stringifyTargetSegments,
  TargetSegments,
  getWriteableSegments,
  getUniqueSegmentValueChars,
} from "services/segments";
import AutoScrollToBottom from "components/AutoScrollToBottom";
import ErrorMessage from "components/Game/ErrorMessage";
import Keyboard from "components/Input/Keyboard";
import InputTiles from "components/Tiles/InputTiles";
import { spacing } from "components/Theme/utils";
import { useGame } from "components/Game/GameProvider";
import { useGameConfig } from "core/game";
import { paths } from "pages/PageRouter";
import PageWrapper from "pages/PageWrapper";
import { checkIsComplete, checkDidSucceed } from "./utils";
import GameAttempts from "../../components/Game/GameAttempts";

const MessageWrapper = styled.div`
  margin-top: ${spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamePage = () => {
  const [gameConfig] = useGameConfig();
  const { targetSegments, mode, validate } = gameConfig;

  const {
    absentKeys,
    setAbsentKeys,
    attemptSegments,
    setAttemptSegments,
    attempts,
    setAttempts,
    error,
    setError,
    initialAttempt,
  } = useGame();

  const writeableSegments = getWriteableSegments(attemptSegments);
  const inputValue = stringifyTargetSegments(writeableSegments);

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

  const isComplete = checkIsComplete(attemptSegments, targetSegments);

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

  if (!gameConfig.startedAt) {
    return <Navigate to={paths.home} />;
  }

  const didSucceed = checkDidSucceed(attempts, targetSegments);

  if (didSucceed) {
    return <Navigate to={paths.gameSuccess} />;
  }

  return (
    <PageWrapper>
      <PageWrapper.Inner>
        <GameAttempts attempts={attempts} targetSegments={targetSegments} />

        <InputTiles inputValue={inputValue} targetSegments={targetSegments} />

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
    </PageWrapper>
  );
};

export default GamePage;
