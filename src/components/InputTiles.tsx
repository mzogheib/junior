import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import { TileSize } from './Tile';

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

export default InputTiles;

export const InputTile = styled.div<{ isFocussed: boolean; size?: TileSize }>`
  width: ${({ size }) => (size === TileSize.Small ? '36px' : '50px')};
  height: ${({ size }) => (size === TileSize.Small ? '36px' : '50px')};
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
