import React, { FC, useState, createContext, useContext } from "react";
import {
  getRandomEquation,
  validateEquation,
} from "../../../services/equation";
import { getRandomWord, validateWord } from "../../../services/words";
import { GameConfig, GameSettings, GameMode } from "../types";

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

const NewGameProvider: FC = ({ children }) => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameSettings, setGameSettings] = useState<GameSettings>();

  const onNewGame = (settings: GameSettings, shouldSaveSettings: boolean) => {
    const { mode, targetLength, difficulty } = settings;

    const startedAt = new Date().toISOString();

    const targetSegments =
      mode === GameMode.Letters
        ? getRandomWord(targetLength)
        : getRandomEquation(difficulty);

    const validate =
      mode === GameMode.Letters ? validateWord : validateEquation;

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
