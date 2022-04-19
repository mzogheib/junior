import {
  Equation,
  EQUATION_CHARACTER_MAP,
  isValidEquation,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import TileInputForm from "./TileInputForm";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";

type Props = {
  targetSegments: Equation;
};

const EquationGame = ({ targetSegments }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(targetSegments)}
        size={TileSize.Small}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={EQUATION_CHARACTER_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (targetSegments: Equation) => {
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
      target={stringifyEquation(targetSegments)}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default EquationGame;
