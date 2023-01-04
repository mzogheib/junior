import { atom, useAtom } from "jotai";

import { GameConfig, GameMode } from "components/Game/types";
import { parseTarget } from "services/segments";
import { validateWord } from "services/words";

const defaultGameConfig = {
  mode: GameMode.Letters,
  targetSegments: parseTarget(""),
  startedAt: "",
  validate: validateWord,
};

export const useGameConfig = () => useAtom(atom<GameConfig>(defaultGameConfig));
