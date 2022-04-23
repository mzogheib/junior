import { useState } from "react";

import { getRandomEquation, validateEquation } from "../../services/equation";
import { getRandomWord, validateWord } from "../../services/words";
import { GameMode, GameConfig } from "./types";

const useNewGame = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [isLoading, setIsLoading] = useState(false);

  const onNewGame = (mode: GameMode, length: number) => {
    setIsLoading(true);

    const targetSegments =
      mode === GameMode.Letters ? getRandomWord(length) : getRandomEquation();

    const validate =
      mode === GameMode.Letters ? validateWord : validateEquation;

    setGameConfig({ mode, targetSegments, validate });

    setIsLoading(false);
  };

  return { isLoading, gameConfig, onNewGame };
};

export default useNewGame;
