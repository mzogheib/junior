import WordInputForm from "./WordInputForm";
import Attempts from "./Attempts";
import GameLayout, { RenderAttempts, RenderInput } from "./GameLayout";

type Props = {
  target: string;
};

const WordGame = ({ target }: Props) => {
  const renderAttempts: RenderAttempts = (attempts) =>
    !!attempts.length && <Attempts attempts={attempts} target={target} />;

  const renderInput: RenderInput = (onError, onSubmit) => (
    <WordInputForm
      length={target.length}
      onSubmit={onSubmit}
      onError={onError}
    />
  );

  return (
    <GameLayout
      target={target}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default WordGame;
