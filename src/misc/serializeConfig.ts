import { GameSettings } from "components/Game/types";
import { TargetSegments } from "services/segments";

type Output = {
  settings: GameSettings;
  targetSegments: TargetSegments;
};
type DeserializeConfig = (serializedConfig: string) => Output | undefined;

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
