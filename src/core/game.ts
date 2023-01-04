import { atom, useAtom } from "jotai";

import { GameConfig, GameMode, GameSettings } from "components/Game/types";
import { parseTarget } from "services/segments";
import { getRandomWord, validateWord } from "services/words";
import { getRandomEquation } from "services/equation";
import { getValidateFunction } from "services/utils";

const defaultGameConfig = {
  mode: GameMode.Letters,
  targetSegments: parseTarget(""),
  startedAt: "",
  validate: validateWord,
};

const gameConfigAtom = atom<GameConfig>(defaultGameConfig);
export const useGameConfig = () => useAtom(gameConfigAtom);

const gameSettingsAtom = atom<GameSettings | null>(null);
export const useGameSettings = () => useAtom(gameSettingsAtom);

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
