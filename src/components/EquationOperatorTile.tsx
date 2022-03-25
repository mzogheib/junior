import React from 'react';

import {
  EquationOperatorValue,
  mapOperatorCharacter,
} from '../services/equation';
import Tile, { TileState } from './Tile';

type Props = {
  value: EquationOperatorValue;
};

const EquationOperatorTile = ({ value }: Props) => (
  <Tile state={TileState.ReadOnly} value={mapOperatorCharacter(value)} />
);

export default EquationOperatorTile;
