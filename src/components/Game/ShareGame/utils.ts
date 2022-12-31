import { useState, useEffect } from "react";

import { GameConfig, GameStats } from "components/Game/types";
import {
  deserializeConfig,
  DeserializedConfig,
  serializeConfig,
} from "misc/serializeConfig";
import { getValidateFunction } from "services/utils";
import { makeSearchString, getQueryParams } from "misc/queryParams";

export const useSharedGame = () => {
  const [sharedConfig, setSharedConfig] = useState<GameConfig>();
  const [sharedStats, setSharedStats] = useState<GameStats>();

  useEffect(() => {
    const { hash } = getQueryParams();

    if (!hash) return;

    const config = deserializeConfig(hash);

    if (!config) return;

    const { settings, targetSegments, stats, successMessage } = config;
    const { mode } = settings;

    const validate = getValidateFunction(mode);

    const startedAt = new Date().toISOString();

    setSharedConfig({
      startedAt,
      mode,
      targetSegments,
      successMessage,
      validate,
    });

    setSharedStats(stats);
  }, []);

  return { config: sharedConfig, stats: sharedStats };
};

export const makeSharedGameUrl = (params: DeserializedConfig) => {
  const serializedConfig = serializeConfig(params);

  return makeUrl("/shared-game", { hash: serializedConfig });
};

const makeUrl = (pathname: string, searchParams?: Record<string, string>) => {
  const { origin } = window.location;

  const searchString = searchParams ? `?${makeSearchString(searchParams)}` : "";

  return `${origin}/junior/#${pathname}${searchString}`;
};
