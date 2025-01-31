import { GameMode, GameSettings } from "components/Game/types";
import { getRandomWord } from "services/words";
import { getRandomEquation } from "services/equation";
import { getValidateFunction } from "services/utils";
import { useSetGameConfig } from "sharedState/gameConfig";
import { useSetGameSettings } from "sharedState/gameSettings";

export const useCreateNewGame = () => {
  const setGameConfig = useSetGameConfig();
  const setGameSettings = useSetGameSettings();

  const createNewGame = (
    settings: GameSettings,
    shouldSaveSettings: boolean
  ) => {
    const { mode, targetLength, difficulty, isTimerVisible } = settings;

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

    setGameConfig({
      startedAt,
      mode,
      targetSegments,
      isTimerVisible,
      validate,
    });
  };

  return createNewGame;
};
