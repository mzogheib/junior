import TileInputForm from "./TileInputForm";
import Attempts from "./Attempts";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import {
  TargetSegments,
  CHARACTER_DISPLAY_MAP,
  READ_ONLY_CHARACTERS,
  stringifyTargetSegments,
} from "../services/equation";
import { isValidWord } from "../services/words";

type Props = {
  targetSegments: TargetSegments;
};

const WordGame = ({ targetSegments }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyTargetSegments(targetSegments)}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={CHARACTER_DISPLAY_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (targetSegments: TargetSegments) => {
      const value = stringifyTargetSegments(targetSegments);

      if (!isValidWord(value)) {
        onError(`Not in word list: ${value}`);
        return false;
      }

      return true;
    };

    return (
      <TileInputForm
        mode="letters"
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

export default WordGame;
