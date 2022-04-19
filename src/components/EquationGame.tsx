import {
  Equation,
  EQUATION_CHARACTER_MAP,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import EquationInputForm from "./EquationInputForm";
import GameLayout from "./GameLayout";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";

type Props = {
  target: Equation;
};

const EquationGame = ({ target }: Props) => {
  const renderAttempts = (attempts: string[]) =>
    !!attempts.length && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(target)}
        size={TileSize.Small}
        readOnlyValues={READ_ONLY_CHARACTERS}
        characterMap={EQUATION_CHARACTER_MAP}
      />
    );

  const renderInput = (
    onError: (value: string) => void,
    onSubmit: (value: string) => void
  ) => (
    <EquationInputForm
      equation={target}
      onSubmit={onSubmit}
      onError={onError}
    />
  );

  return (
    <GameLayout
      target={stringifyEquation(target)}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default EquationGame;
