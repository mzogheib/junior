import EquationInputForm from "./EquationInputForm";
import Attempts from "./Attempts";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";
import {
  Equation,
  EQUATION_CHARACTER_MAP,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import { isValidWord } from "../services/words";

type Props = {
  target: Equation;
};

const WordGame = ({ target }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(target)}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={EQUATION_CHARACTER_MAP}
      />
    );

  const renderInput: RenderInput = (onError, onSubmit) => {
    const handleValidate = (equation: Equation) => {
      const value = stringifyEquation(equation);

      if (!isValidWord(value)) {
        onError(`Not in word list: ${value}`);
        return false;
      }

      return true;
    };

    return (
      <EquationInputForm
        mode="letters"
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

export default WordGame;
