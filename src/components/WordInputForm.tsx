import InvisibleInputForm from './InvisibleInputForm';
import InputTiles, { InputTile } from './InputTiles';

type Props = {
  length: number;
  onSubmit: (attempt: string) => void;
};

const WordInputForm = ({ length, onSubmit }: Props) => {
  const tileIndeces = Array.from(Array(length).keys());

  return (
    <InvisibleInputForm
      mode="letters"
      length={length}
      onSubmit={onSubmit}
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
