import React from 'react';

import {
  EquationOperatorValue,
  mapOperatorCharacter,
} from '../services/equation';
import Tile, { TileSize, TileState } from './Tile';

type Props = {
  value: EquationOperatorValue;
};

const EquationOperatorTile = ({ value }: Props) => (
  <Tile
    size={TileSize.Small}
    state={TileState.ReadOnly}
    value={mapOperatorCharacter(value)}
  />
);

export default EquationOperatorTile;
