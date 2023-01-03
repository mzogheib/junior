import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { makeAttemptSegments, TargetSegments } from "services/segments";
import { Attempt, GameStats } from "components/Game/types";
import { ChildrenProp } from "types";
import { useNewGame } from "components/NewGame/NewGameProvider";

type GameContextValue = {
  absentKeys: string[];
  setAbsentKeys: (value: string[]) => void;
  attemptSegments: TargetSegments;
  setAttemptSegments: (value: TargetSegments) => void;
  attempts: Attempt[];
  setAttempts: (value: Attempt[]) => void;
  error: string;
  setError: (value: string) => void;
  initialAttempt: TargetSegments;
  gameStats: GameStats;
};

const GameContext = createContext<GameContextValue>({
  absentKeys: [],
  setAbsentKeys: () => {},
  attemptSegments: [],
  setAttemptSegments: () => {},
  attempts: [],
  setAttempts: () => {},
  error: "",
  setError: () => {},
  initialAttempt: [],
  gameStats: { startedAt: "", finishedAt: "", numAttempts: 0 },
});

export const useGame = () => useContext(GameContext);

const GameProvider = ({ children }: ChildrenProp) => {
  const { gameConfig } = useNewGame();

  const { targetSegments, startedAt } = gameConfig;
  const initialAttempt = useMemo(
    () => makeAttemptSegments("", targetSegments),
    [targetSegments]
  );

  const [absentKeys, setAbsentKeys] = useState<string[]>([]);
  const [attemptSegments, setAttemptSegments] =
    useState<TargetSegments>(initialAttempt);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState("");

  const numAttempts = attempts.length;
  const finishedAt = attempts[numAttempts - 1]?.submittedAt;
  const gameStats = { startedAt, finishedAt, numAttempts };

  useEffect(() => {
    setAbsentKeys([]);
    setAttemptSegments(initialAttempt);
    setAttempts([]);
    setError("");
  }, [startedAt, initialAttempt]);

  const value = {
    absentKeys,
    setAbsentKeys,
    attemptSegments,
    setAttemptSegments,
    attempts,
    setAttempts,
    error,
    setError,
    initialAttempt,
    gameStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
