import { useState, createContext, useContext } from "react";

import { getRandomEquation } from "services/equation";
import { getRandomWord } from "services/words";
import { getValidateFunction } from "services/utils";
import { GameConfig, GameSettings, GameMode } from "components/Game/types";
import { ChildrenProp } from "types";
import { useGameConfig } from "core/game";

type NewGameContextValue = {
  gameSettings?: GameSettings;
  onNewGame: (settings: GameSettings, shouldSaveSettings: boolean) => void;
  setGameConfig: (config: GameConfig) => void;
};

const NewGameContext = createContext<NewGameContextValue>({
  onNewGame: () => {},
  setGameConfig: () => {},
});

export const useNewGame = () => useContext(NewGameContext);

const NewGameProvider = ({ children }: ChildrenProp) => {
  const [gameConfig, setGameConfig] = useGameConfig();
  const [gameSettings, setGameSettings] = useState<GameSettings>();

  const onNewGame = (settings: GameSettings, shouldSaveSettings: boolean) => {
    const { mode, targetLength, difficulty } = settings;

    const startedAt = new Date().toISOString();

    const targetSegments =
      mode === GameMode.Letters
        ? getRandomWord(targetLength)
        : getRandomEquation(difficulty);

    const validate = getValidateFunction(mode);

    if (shouldSaveSettings) {
      setGameSettings(settings);
    } else {
      setGameSettings(undefined);
    }

    setGameConfig({ startedAt, mode, targetSegments, validate });
  };

  const value = {
    gameConfig,
    gameSettings,
    onNewGame,
    setGameConfig,
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameProvider;
