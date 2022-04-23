import { TargetSegments } from "../../services/segments";

export enum GameMode {
  Letters = "letters",
  Numbers = "numbers",
}

export type GameConfig = {
  mode: GameMode;
  targetSegments: TargetSegments;
  validate: (targetSegments: TargetSegments) => string | undefined;
};
