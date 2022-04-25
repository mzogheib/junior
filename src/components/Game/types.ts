import { TargetSegments } from "../../services/segments";

export enum GameMode {
  Letters = "letters",
  Numbers = "numbers",
}

export enum WordLength {
  Five = 5,
  Six = 6,
}

export enum GameDifficulty {
  Easy = "easy",
  Hard = "hard",
}

export type GameOptions = {
  mode: GameMode;
  targetLength?: number;
  difficulty?: GameDifficulty;
};

export type GameConfig = {
  mode: GameMode;
  targetSegments: TargetSegments;
  startedAt: string;
  validate: (targetSegments: TargetSegments) => string | undefined;
};

export type Attempt = {
  value: string;
  submittedAt: string;
};
