import { atom, useAtomValue, useSetAtom } from "jotai";

import { GameSettings } from "@/components/Game/types";

const gameSettingsAtom = atom<GameSettings | null>(null);

export const useGameSettings = () => useAtomValue(gameSettingsAtom);
export const useSetGameSettings = () => useSetAtom(gameSettingsAtom);
