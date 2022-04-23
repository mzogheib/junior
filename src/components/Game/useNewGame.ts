import { useState } from "react";

import { getRandomEquation } from "../../services/equation";
import { TargetSegments } from "../../services/segments";
import { getRandomWord } from "../../services/words";
import { GameMode } from "./types";

const useNewGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>();
  const [isLoading, setIsLoading] = useState(false);

  const [targetSegments, setTargetSegments] = useState<TargetSegments>();

  const onNewGame = (newGameMode: GameMode, length: number) => {
    setIsLoading(true);

    if (newGameMode === GameMode.Numbers) {
      const newTargetSegments = getRandomEquation();
      setTargetSegments(newTargetSegments);
    } else {
      const newTarget = getRandomWord(length);
      setTargetSegments(newTarget);
    }

    setGameMode(newGameMode);
    setIsLoading(false);
  };

  return {
    targetSegments,
    isLoading,
    gameMode,
    onNewGame,
  };
};

export default useNewGame;
