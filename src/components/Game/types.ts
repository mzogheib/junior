import { TargetSegments } from "../../services/segments";
import { TileSize } from "./Tile";

export enum GameMode {
  Letters = "letters",
  Numbers = "numbers",
}

export type GameConfig = {
  mode: GameMode;
  tileSize: TileSize;
  targetSegments: TargetSegments;
  validate: (targetSegments: TargetSegments) => string | undefined;
};
