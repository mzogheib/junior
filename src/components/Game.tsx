import { validateEquation } from "../services/equation";
import {
  TargetSegments,
  CHARACTER_DISPLAY_MAP,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
} from "../services/segments";
import TileInputForm from "./TileInputForm";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";
import { GameMode } from "../misc/types";
import { validateWord } from "../services/words";

type Props = {
  targetSegments: TargetSegments;
  gameMode: GameMode;
};

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

const Game = ({ targetSegments, gameMode }: Props) => {
  const { tileSize, validate } = gameConfig[gameMode];

  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyTargetSegments(targetSegments)}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={CHARACTER_DISPLAY_MAP}
        size={tileSize}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (targetSegments: TargetSegments) => {
      const error = validate(targetSegments);
      if (error) {
        onError(error);
        return false;
      }

      return true;
    };

    return (
      <TileInputForm
        mode={gameMode}
        size={tileSize}
        targetSegments={targetSegments}
        onSubmit={onSubmit}
        onValidate={handleValidate}
      />
    );
  };

  return (
    <GameLayout
      target={stringifyTargetSegments(targetSegments)}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default Game;
