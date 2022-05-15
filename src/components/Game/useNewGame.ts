import { useState } from "react";

import { getRandomEquation, validateEquation } from "../../services/equation";
import { getRandomWord, validateWord } from "../../services/words";
import { GameMode, GameConfig, GameSettings } from "./types";

const useNewGame = () => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameSettings, setGameSettings] = useState<GameSettings>();

  const onNewGame = (settings: GameSettings) => {
    const { mode, targetLength, difficulty } = settings;

    const startedAt = new Date().toISOString();

    const targetSegments =
      mode === GameMode.Letters
        ? getRandomWord(targetLength)
        : getRandomEquation(difficulty);

    const validate =
      mode === GameMode.Letters ? validateWord : validateEquation;

    setGameConfig({ startedAt, mode, targetSegments, validate });
  };

  return {
    gameConfig,
    gameSettings,
    setGameSettings,
    isNewGameDialogOpen,
    setIsNewGameDialogOpen,
    onNewGame,
  };
};

export default useNewGame;
