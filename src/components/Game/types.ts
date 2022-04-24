import { TargetSegments } from "../../services/segments";

export enum GameMode {
  Letters = "letters",
  Numbers = "numbers",
}

export enum GameDifficulty {
  Easy = "easy",
  Hard = "hard",
}

export type GameOptions = {
  targetLength?: number;
  difficulty?: GameDifficulty;
};

export type GameConfig = {
  mode: GameMode;
  targetSegments: TargetSegments;
  validate: (targetSegments: TargetSegments) => string | undefined;
};
