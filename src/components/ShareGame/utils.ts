import { useState, useEffect } from "react";

import { GameConfig, GameStats } from "components/Game/types";
import {
  deserializeConfig,
  DeserializedConfig,
  serializeConfig,
} from "misc/serializeConfig";
import { getValidateFunction } from "services/utils";
import { makeUrl, getQueryParams } from "misc/url";

export const useCustomGame = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>();
  const [gameStats, setGameStats] = useState<GameStats>();

  useEffect(() => {
    const { hash } = getQueryParams();

    if (!hash) return;

    const config = deserializeConfig(hash);

    if (!config) return;

    const { settings, targetSegments, stats, successMessage } = config;
    const { mode } = settings;

    const validate = getValidateFunction(mode);

    const startedAt = new Date().toISOString();

    setGameConfig({
      startedAt,
      mode,
      targetSegments,
      successMessage,
      validate,
    });

    setGameStats(stats);
  }, []);

  return { config: gameConfig, stats: gameStats };
};

export const makeSharedGameUrl = (params: DeserializedConfig) => {
  const serializedConfig = serializeConfig(params);

  return makeUrl("/custom-game", { hash: serializedConfig });
};
