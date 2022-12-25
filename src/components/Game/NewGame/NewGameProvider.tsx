import { useState, createContext, useContext, useEffect } from "react";

import { getRandomEquation } from "services/equation";
import { getRandomWord } from "services/words";
import { getValidateFunction } from "services/utils";
import { GameConfig, GameSettings, GameMode } from "components/Game/types";
import { ChildrenProp } from "types";
import { getQueryParams, setQueryParams } from "misc/queryParams";

const useSharedGame = () => {
  const [sharedConfig, setSharedConfig] = useState<GameConfig>();

  useEffect(() => {
    const { config: configHash } = getQueryParams();

    if (!configHash) return;

    const config = JSON.parse(window.atob(configHash));
    const { settings, targetSegments } = config;
    const { mode } = settings;

    const validate = getValidateFunction(mode);

    const startedAt = new Date().toISOString();

    setSharedConfig({ startedAt, mode, targetSegments, validate });

    setQueryParams({});
  }, []);

  return sharedConfig;
};

type NewGameContextValue = {
  gameConfig?: GameConfig;
  gameSettings?: GameSettings;
  isNewGameDialogOpen: boolean;
  setIsNewGameDialogOpen: (value: boolean) => void;
  onNewGame: (settings: GameSettings, shouldSaveSettings: boolean) => void;
};

const NewGameContext = createContext<NewGameContextValue>({
  isNewGameDialogOpen: false,
  setIsNewGameDialogOpen: (value: boolean) => {},
  onNewGame: (settings: GameSettings, shouldSaveSettings: boolean) => {},
});

export const useNewGame = () => useContext(NewGameContext);

const NewGameProvider = ({ children }: ChildrenProp) => {
  const initialConfig = useSharedGame();

  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameSettings, setGameSettings] = useState<GameSettings>();

  useEffect(() => {
    if (initialConfig) {
      setIsNewGameDialogOpen(false);
      setGameConfig(initialConfig);
    }
  }, [initialConfig]);

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
    isNewGameDialogOpen,
    setIsNewGameDialogOpen,
    onNewGame,
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameProvider;
