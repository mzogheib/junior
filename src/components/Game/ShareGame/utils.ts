import { useState, useEffect } from "react";

import { GameConfig } from "components/Game/types";
import { getQueryParams, setQueryParams } from "misc/queryParams";
import { deserializeConfig } from "misc/serializeConfig";
import { getValidateFunction } from "services/utils";

export const useSharedGame = () => {
  const [sharedConfig, setSharedConfig] = useState<GameConfig>();

  useEffect(() => {
    const { config: configHash } = getQueryParams();

    if (!configHash) return;

    const config = deserializeConfig(configHash);

    if (!config) {
      setQueryParams({});
      return;
    }

    const { settings, targetSegments } = config;
    const { mode } = settings;

    const validate = getValidateFunction(mode);

    const startedAt = new Date().toISOString();

    setSharedConfig({ startedAt, mode, targetSegments, validate });

    setQueryParams({});
  }, []);

  return sharedConfig;
};
