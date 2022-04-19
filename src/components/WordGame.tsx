import TileInputForm from "./TileInputForm";
import Attempts from "./Attempts";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import {
  Equation,
  CHARACTER_DISPLAY_MAP,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import { isValidWord } from "../services/words";

type Props = {
  targetSegments: Equation;
};

const WordGame = ({ targetSegments }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(targetSegments)}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={CHARACTER_DISPLAY_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (targetSegments: Equation) => {
      const value = stringifyEquation(targetSegments);

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
      target={stringifyEquation(targetSegments)}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default WordGame;
