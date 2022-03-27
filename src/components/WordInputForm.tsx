import InvisibleInputForm from './InvisibleInputForm';
import InputTiles, { InputTile } from './InputTiles';
import { isValidWord } from '../services/words';

type Props = {
  length: number;
  onSubmit: (attempt: string) => void;
  onError: (error: string) => void;
};

const WordInputForm = ({ length, onSubmit, onError }: Props) => {
  const tileIndeces = Array.from(Array(length).keys());

  const handleValidate = (value: string) => {
    if (!isValidWord(value)) {
      onError(`Not in word list: ${value}`);
      return false;
    }

    return true;
  };

  return (
    <InvisibleInputForm
      mode="letters"
      length={length}
      onSubmit={onSubmit}
      onValidate={handleValidate}
      renderInput={(value, onClick) => (
        <InputTiles onClick={onClick}>
          {tileIndeces.map((index) => {
            return (
              <InputTile key={index} isFocussed={index === value.length}>
                {value[index]}
              </InputTile>
            );
          })}
        </InputTiles>
      )}
    />
  );
};

export default WordInputForm;
