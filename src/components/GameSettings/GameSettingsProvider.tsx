import React, { FC, useState, createContext, useContext } from 'react';

export enum GameMode {
  Letters = 'letters',
  Numbers = 'numbers',
}

type GameSettingsContextValue = {
  onToggleGameMode?: () => void;
  gameMode?: GameMode;
};

const GameSettingsContext = createContext<GameSettingsContextValue>({});

export const useGameSettings = () => useContext(GameSettingsContext);

const GameSettingsProvider: FC = ({ children }) => {
  const [gameMode, setMode] = useState<GameMode>(GameMode.Numbers);

  const handleToggleMode = () => {
    if (gameMode === GameMode.Letters) {
      setMode(GameMode.Numbers);
    } else {
      setMode(GameMode.Letters);
    }
  };

  return (
    <GameSettingsContext.Provider
      value={{ onToggleGameMode: handleToggleMode, gameMode }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export default GameSettingsProvider;
