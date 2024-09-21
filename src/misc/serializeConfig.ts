import { GameSettings, GameStats } from "@/components/Game/types";
import { TargetSegments } from "@/services/segments";

type SerializedConfig = string;

export type DeserializedConfig = {
  settings: GameSettings;
  targetSegments: TargetSegments;
  stats: GameStats;
  successMessage?: string;
};

type DeserializeConfig = (
  serializedConfig: SerializedConfig
) => DeserializedConfig | undefined;

export const deserializeConfig: DeserializeConfig = (serializedConfig) => {
  try {
    const deserializedConfig = JSON.parse(
      window.atob(window.decodeURIComponent(serializedConfig))
    );

    // TODO add a full check or type guard
    if (
      !deserializedConfig?.settings ||
      !deserializedConfig?.targetSegments ||
      !deserializedConfig?.stats
    ) {
      throw new Error("Invalid config");
    }

    return deserializedConfig;
  } catch {
    return;
  }
};

type SerializeConfig = (
  deserializedConfig: DeserializedConfig
) => SerializedConfig;

export const serializeConfig: SerializeConfig = (params) =>
  window.encodeURIComponent(window.btoa(JSON.stringify(params)));
