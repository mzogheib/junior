import WordInputForm from "./WordInputForm";
import Attempts from "./Attempts";
import GameLayout from "./GameLayout";

type Props = {
  target: string;
};

const WordGame = ({ target }: Props) => {
  const renderAttempts = (attempts: string[]) =>
    !!attempts.length && <Attempts attempts={attempts} target={target} />;

  const renderInput = (
    onError: (value: string) => void,
    onSubmit: (value: string) => void
  ) => (
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
