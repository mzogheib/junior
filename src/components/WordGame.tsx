import WordInputForm from "./WordInputForm";
import Attempts from "./Attempts";
import GameLayout from "./GameLayout";

type Props = {
  target: string;
  onSuccess: (numAttempts: number) => void;
};

const WordGame = ({ target, onSuccess }: Props) => {
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
      onSuccess={onSuccess}
    />
  );
};

export default WordGame;
