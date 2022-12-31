import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { GameConfig, GameStats } from "components/Game/types";
import {
  deserializeConfig,
  DeserializedConfig,
  serializeConfig,
} from "misc/serializeConfig";
import { getValidateFunction } from "services/utils";

export const useSharedGame = () => {
  const { config: configHash } = useParams();

  const [sharedConfig, setSharedConfig] = useState<GameConfig>();
  const [sharedStats, setSharedStats] = useState<GameStats>();

  useEffect(() => {
    if (!configHash) return;

    const config = deserializeConfig(configHash);

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
  }, [configHash]);

  return { config: sharedConfig, stats: sharedStats };
};

export const makeSharedGameUrl = (params: DeserializedConfig) => {
  const { origin } = window.location;
  const serializedConfig = serializeConfig(params);

  return `${origin}/#/junior/game/${serializedConfig}`;
};
