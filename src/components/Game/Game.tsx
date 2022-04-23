import { useState } from "react";
import { GameConfig } from "./types";
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
import TileInputForm from "./TileInputForm";

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
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const { tileSize, targetSegments, mode, validate } = config;
  const target = stringifyTargetSegments(targetSegments);
  const didSucceed = checkDidSucceed(attempts, target);

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
    setAttempts(attempts.concat([attempt]));
  };

  return (
    <>
      {!!attempts.length && (
        <Attempts
          attempts={attempts}
          target={stringifyTargetSegments(targetSegments)}
          readOnlyValues={READ_ONLY_CHARACTERS}
          characterMap={CHARACTER_DISPLAY_MAP}
          size={tileSize}
        />
      )}

      {!didSucceed && (
        <TileInputForm
          mode={mode}
          size={tileSize}
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
    </>
  );
};

export default Game;
