import { atom, useAtomValue, useSetAtom } from "jotai";

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
export const useGameConfig = () => useAtomValue(gameConfigAtom);
export const useSetGameConfig = () => useSetAtom(gameConfigAtom);

const gameSettingsAtom = atom<GameSettings | null>(null);
export const useGameSettings = () => useAtomValue(gameSettingsAtom);
export const useSetGameSettings = () => useSetAtom(gameSettingsAtom);

const gameResultAtom = atom<GameResult | null>(null);
export const useGameResult = () => useAtomValue(gameResultAtom);
export const useSetGameResult = () => useSetAtom(gameResultAtom);

export const useNewGame = () => {
  const setGameConfig = useSetGameConfig();
  const setGameSettings = useSetGameSettings();

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
