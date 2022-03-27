import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import InvisibleInputForm from './InvisibleInputForm';

const InputTiles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getBorderColor = (isFocussed: boolean, theme: Theme) => {
  const focussedConfig = {
    light: 'black',
    dark: 'white',
  };

  return isFocussed ? focussedConfig[theme.palette.mode] : 'gray';
};

const InputTile = styled.div<{ isFocussed: boolean }>`
  width: 50px;
  height: 50px;
  border: 1px ${({ isFocussed, theme }) => getBorderColor(isFocussed, theme)}
    solid;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: 0 2px;
  color: ${({ theme }) => (theme.palette.mode === 'light' ? 'black' : 'white')};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  length: number;
  onSubmit: (attempt: string) => void;
};

const AttemptInput = ({ length, onSubmit }: Props) => {
  const tileIndeces = Array.from(Array(length).keys());

  return (
    <InvisibleInputForm
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

export default AttemptInput;
