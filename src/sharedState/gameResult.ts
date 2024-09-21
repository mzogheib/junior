import { atom, useAtomValue, useSetAtom } from "jotai";

import { GameResult } from "@/components/Game/types";

const gameResultAtom = atom<GameResult | null>(null);

export const useGameResult = () => useAtomValue(gameResultAtom);
export const useSetGameResult = () => useSetAtom(gameResultAtom);
