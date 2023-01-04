import { atom, useAtom } from "jotai";

import {
  GameConfig,
  GameMode,
  GameSettings,
  GameResult,
} from "components/Game/types";
import { getRandomWord } from "services/words";
import { getRandomEquation } from "services/equation";
import { getValidateFunction } from "services/utils";

const gameConfigAtom = atom<GameConfig | null>(null);
export const useGameConfig = () => useAtom(gameConfigAtom);

const gameSettingsAtom = atom<GameSettings | null>(null);
export const useGameSettings = () => useAtom(gameSettingsAtom);

const gameResultAtom = atom<GameResult | null>(null);
export const useGameResult = () => useAtom(gameResultAtom);

export const useNewGame = () => {
  const [_, setGameConfig] = useGameConfig();
  const [__, setGameSettings] = useGameSettings();

  const createNewGame = (
    settings: GameSettings,
    shouldSaveSettings: boolean
  ) => {
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
      setGameSettings(null);
    }

    setGameConfig({ startedAt, mode, targetSegments, validate });
  };

  return { createNewGame };
};
