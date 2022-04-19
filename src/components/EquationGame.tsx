import { isValidEquation } from "../services/equation";
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

type Props = {
  targetSegments: TargetSegments;
};

const EquationGame = ({ targetSegments }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyTargetSegments(targetSegments)}
        size={TileSize.Small}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={CHARACTER_DISPLAY_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (targetSegments: TargetSegments) => {
      if (!isValidEquation(targetSegments)) {
        onError("Invalid equation");
        return false;
      }

      return true;
    };

    return (
      <TileInputForm
        mode="numbers"
        size={TileSize.Small}
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

export default EquationGame;
