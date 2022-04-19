import {
  Equation,
  EQUATION_CHARACTER_MAP,
  isValidEquation,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import EquationInputForm from "./EquationInputForm";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";

type Props = {
  target: Equation;
};

const EquationGame = ({ target }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(target)}
        size={TileSize.Small}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={EQUATION_CHARACTER_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (equation: Equation) => {
      if (!isValidEquation(equation)) {
        onError("Invalid equation");
        return false;
      }

      return true;
    };

    return (
      <EquationInputForm
        mode="numbers"
        size={TileSize.Small}
        equation={target}
        onSubmit={onSubmit}
        onValidate={handleValidate}
      />
    );
  };

  return (
    <GameLayout
      target={stringifyEquation(target)}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default EquationGame;
