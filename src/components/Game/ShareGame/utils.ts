import { useState, useEffect } from "react";

import { GameConfig } from "components/Game/types";
import {
  getQueryParams,
  makeSearchString,
  setQueryParams,
} from "misc/queryParams";
import {
  deserializeConfig,
  DeserializedConfig,
  serializeConfig,
} from "misc/serializeConfig";
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

export const makeSharedGameUrl = (params: DeserializedConfig) => {
  const { origin } = window.location;
  const serializedConfig = serializeConfig(params);
  const searchString = makeSearchString({ config: serializedConfig });

  return `${origin}/junior/shared-game?${searchString}`;
};
