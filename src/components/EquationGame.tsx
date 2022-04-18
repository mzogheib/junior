import React, { useEffect, useState } from "react";

import { Equation, stringifyEquation } from "../services/equation";
import { usePrevious } from "../misc/utils";
import EquationAttempts from "./EquationAttempts";
import EquationInputForm from "./EquationInputForm";
import GameLayout from "./GameLayout";

type Props = {
  target: Equation;
  onSuccess: (numAttempts: number) => void;
};

const EquationGame = ({ target, onSuccess }: Props) => {
  const [attempts, setAttempts] = useState<Equation[]>([]);
  const [error, setError] = useState("");

  const previousTarget = usePrevious(target);
  const didChangeTarget = target !== previousTarget;
  useEffect(() => {
    if (didChangeTarget) {
      setAttempts([]);
      setError("");
    }
  }, [didChangeTarget]);

  const handleSubmit = (attempt: Equation) => {
    setError("");

    setAttempts(attempts.concat([attempt]));
  };

  const lastAttempt = attempts.length
    ? attempts[attempts.length - 1]
    : undefined;
  const didSucceed =
    !!lastAttempt &&
    stringifyEquation(lastAttempt) === stringifyEquation(target);

  useEffect(() => {
    if (didSucceed) {
      onSuccess(attempts.length);
    }
  }, [didSucceed, attempts.length, onSuccess]);

  const renderAttempts = () =>
    !!attempts.length &&
    !!target && <EquationAttempts attempts={attempts} target={target} />;

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
