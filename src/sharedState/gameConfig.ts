import { atom, useAtomValue, useSetAtom } from "jotai";

import { GameConfig } from "@/components/Game/types";

const gameConfigAtom = atom<GameConfig | null>(null);

export const useGameConfig = () => useAtomValue(gameConfigAtom);
export const useSetGameConfig = () => useSetAtom(gameConfigAtom);
