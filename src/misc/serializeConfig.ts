import { GameSettings } from "components/Game/types";
import { TargetSegments } from "services/segments";

type SerializedConfig = string;

type DeserializedConfig = {
  settings: GameSettings;
  targetSegments: TargetSegments;
};

type DeserializeConfig = (
  serializedConfig: SerializedConfig
) => DeserializedConfig | undefined;

export const deserializeConfig: DeserializeConfig = (serializedConfig) => {
  try {
    const deserializedConfig = JSON.parse(window.atob(serializedConfig));

    // TODO add a full check or type guard
    if (!deserializedConfig?.settings || !deserializedConfig?.targetSegments) {
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
  window.btoa(JSON.stringify(params));
