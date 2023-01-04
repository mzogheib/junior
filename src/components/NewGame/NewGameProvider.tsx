import { useState, createContext, useContext } from "react";

import { getRandomEquation } from "services/equation";
import { getRandomWord, validateWord } from "services/words";
import { getValidateFunction } from "services/utils";
import { GameConfig, GameSettings, GameMode } from "components/Game/types";
import { ChildrenProp } from "types";
import { parseTarget } from "services/segments";

type NewGameContextValue = {
  gameConfig: GameConfig;
  gameSettings?: GameSettings;
  onNewGame: (settings: GameSettings, shouldSaveSettings: boolean) => void;
  setGameConfig: (config: GameConfig) => void;
};

const defaultGameConfig = {
  mode: GameMode.Letters,
  targetSegments: parseTarget(""),
  startedAt: "",
  validate: validateWord,
};

const NewGameContext = createContext<NewGameContextValue>({
  gameConfig: defaultGameConfig,
  onNewGame: () => {},
  setGameConfig: () => {},
});

export const useNewGame = () => useContext(NewGameContext);

const NewGameProvider = ({ children }: ChildrenProp) => {
  const [gameConfig, setGameConfig] = useState<GameConfig>(defaultGameConfig);
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
