import { GameConfig, GameMode } from "components/Game/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseTarget } from "services/segments";
import { getValidateFunction } from "services/utils";

type CustomGameConfig = {
  target: string;
  successMessage?: string;
};

const isLetter = (character: string) =>
  character.length === 1 && character.match(/[A-Z]/i);

export const useCustomGame = () => {
  const { hash } = useParams();

  const [gameConfig, setGameConfig] = useState<GameConfig>();

  useEffect(() => {
    if (!hash) return;

    const config = deserializeCustomGameConfig(hash);

    if (!config) return;

    const { target, successMessage } = config;

    const mode = target.split("").every(isLetter)
      ? GameMode.Letters
      : GameMode.Numbers;

    const validate = getValidateFunction(mode);

    const startedAt = new Date().toISOString();

    const targetSegments = parseTarget(target);

    setGameConfig({
      startedAt,
      mode,
      targetSegments,
      successMessage,
      validate,
    });
  }, [hash]);

  return { config: gameConfig };
};

type DeserializeCustomGameConfig = (
  hash: string
) => CustomGameConfig | undefined;

const deserializeCustomGameConfig: DeserializeCustomGameConfig = (hash) => {
  try {
    const deserializedConfig = JSON.parse(window.atob(hash));

    // TODO add a full check or type guard
    if (!deserializedConfig?.target) {
      throw new Error("Invalid config");
    }

    return deserializedConfig;
  } catch {
    return;
  }
};
