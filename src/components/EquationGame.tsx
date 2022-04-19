import React, { useEffect, useState } from "react";

import {
  Equation,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
  stringifyEquationForDisplay,
} from "../services/equation";
import { usePrevious } from "../misc/utils";
import EquationInputForm from "./EquationInputForm";
import GameLayout from "./GameLayout";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";

type Props = {
  target: Equation;
  onSuccess: (numAttempts: number) => void;
};

const EquationGame = ({ target, onSuccess }: Props) => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
      setError("");
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: string) => {
    setError("");

    setAttempts(attempts.concat([attempt]));
  };

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed =
    !!lastAttempt && lastAttempt === stringifyEquationForDisplay(target);

  useEffect(() => {
    if (didSucceed) {
      onSuccess(attempts.length);
    }
  }, [didSucceed, attempts.length, onSuccess]);

  const renderAttempts = () =>
    !!attempts.length &&
    !!target && (
      <Attempts
        attempts={attempts}
        target={stringifyEquation(target)}
        size={TileSize.Small}
        readOnlyValues={READ_ONLY_CHARACTERS}
      />
    );

  const renderInput = () =>
    !didSucceed &&
    target && (
      <EquationInputForm
        key={`${didChangeTarget}`}
        equation={target}
        onSubmit={handleSubmit}
        onError={setError}
      />
    );

  return (
    <GameLayout
      error={error}
      renderAttempts={renderAttempts}
      renderInput={renderInput}
    />
  );
};

export default EquationGame;
