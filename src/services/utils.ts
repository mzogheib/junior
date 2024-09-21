import { Attempt, GameMode } from "@/components/Game/types";
import { validateEquation } from "@/services/equation";
import { validateWord } from "@/services/words";

export const getValidateFunction = (gameMode: GameMode) =>
  gameMode === GameMode.Letters ? validateWord : validateEquation;

export const getAttemptsValues = (attempts: Attempt[]) =>
  attempts.map(({ value }) => value);
