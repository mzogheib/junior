import { useState } from "react";
import { TileSize } from "./Tile";
import { GameMode } from "../misc/types";
import { validateWord } from "../services/words";
import { validateEquation } from "../services/equation";
import {
  stringifyTargetSegments,
  READ_ONLY_CHARACTERS,
  CHARACTER_DISPLAY_MAP,
  TargetSegments,
} from "../services/segments";
import Attempts from "./Attempts";

import AutoScrollToBottom from "./AutoScrollToBottom";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import TileInputForm from "./TileInputForm";

const gameConfig = {
  [GameMode.Letters]: {
    tileSize: TileSize.Default,
    validate: validateWord,
  },
  [GameMode.Numbers]: {
    tileSize: TileSize.Small,
    validate: validateEquation,
  },
};

type Props = {
  targetSegments: TargetSegments;
  gameMode: GameMode;
};

const Game = ({ targetSegments, gameMode }: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");
  const target = stringifyTargetSegments(targetSegments);

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed = !!lastAttempt && lastAttempt === target;

  const handleSubmit = (attempt: string) => {
    setError("");

    setAttempts(attempts.concat([attempt]));
  };

  const { tileSize, validate } = gameConfig[gameMode];

  const renderAttempts = () =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyTargetSegments(targetSegments)}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={CHARACTER_DISPLAY_MAP}
        size={tileSize}
      />
    );

  const renderInput = () => {
    const handleValidate = (targetSegments: TargetSegments) => {
      const error = validate(targetSegments);
      if (error) {
        setError(error);
        return false;
      }

      return true;
    };

    return (
      <TileInputForm
        mode={gameMode}
        size={tileSize}
        targetSegments={targetSegments}
        onSubmit={handleSubmit}
        onValidate={handleValidate}
      />
    );
  };

  return (
    <>
      {renderAttempts()}
      {!didSucceed && renderInput()}
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
