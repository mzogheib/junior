import { useState } from "react";

import { getRandomEquation, validateEquation } from "../../services/equation";
import { getRandomWord, validateWord } from "../../services/words";
import { GameMode, GameConfig, GameOptions } from "./types";

const useNewGame = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = (options: GameOptions) => {
    setIsLoading(true);

    const { mode, targetLength, difficulty } = options;

    const startedAt = new Date().toISOString();

    const targetSegments =
      mode === GameMode.Letters
        ? getRandomWord(targetLength)
        : getRandomEquation(difficulty);

    const validate =
      mode === GameMode.Letters ? validateWord : validateEquation;

    setGameConfig({ startedAt, mode, targetSegments, validate });

    setIsLoading(false);
  };

  return { isLoading, gameConfig, onNewGame };
};

export default useNewGame;
