import { useState } from "react";
import styled from "@emotion/styled";

import { getRandomWord } from "./services/words";
import AppHeader from "./components/AppHeader";
import {
  Equation,
  EquationComponentType,
  EquationOperatorValue,
  getRandomEquation,
  READ_ONLY_CHARACTERS,
} from "./services/equation";
import { GameMode } from "./misc/types";
import EquationGame from "./components/EquationGame";
import WordGame from "./components/WordGame";
import NewGameDialog from "./components/NewGameDialog";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  padding: 10px;
  overflow: auto;
`;

const useGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>();
  const [isLoading, setIsLoading] = useState(false);

  const [target, setTarget] = useState<Equation>();

  const onNewGame = async (newGameMode: GameMode, length: number) => {
    setIsLoading(true);

    if (newGameMode === GameMode.Numbers) {
      const newTarget = await getRandomEquation();
      setTarget(newTarget);
    } else {
      const newTarget = await getRandomWord(length);

      const equation: Equation = newTarget.split("").map((value) => {
        if (READ_ONLY_CHARACTERS.includes(value)) {
          return {
            type: EquationComponentType.Operator,
            value: value as EquationOperatorValue,
          };
        }

        return {
          type: EquationComponentType.Term,
          value,
        };
      });

      setTarget(equation);
    }

    setGameMode(newGameMode);
    setIsLoading(false);
  };

  return {
    target,
    isLoading,
    gameMode,
    onNewGame,
  };
};

const App = () => {
  const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(true);

  const { target, isLoading, gameMode, onNewGame } = useGame();

  const handleNewGame = async (newGameMode: GameMode, length: number) => {
    await onNewGame(newGameMode, length);
    setIsNewGameDialogOpen(false);
  };

  const handleCancelNewGame = () => {
    // Cannot avoid creating the first game
    const isFirstGame = !target;
    if (isFirstGame) {
      return;
    }

    return () => setIsNewGameDialogOpen(false);
  };

  const renderGame = () => {
    if (isLoading || !target?.length) {
      return;
    }

    if (gameMode === GameMode.Numbers) {
      return <EquationGame target={target} />;
    }

    if (gameMode === GameMode.Letters) {
      return <WordGame target={target} />;
    }
  };

  return (
    <>
      <Wrapper>
        <AppHeader
          isLoading={isLoading}
          onNewGame={() => setIsNewGameDialogOpen(true)}
        />

        <Main>{renderGame()}</Main>
      </Wrapper>

      {isNewGameDialogOpen && (
        <NewGameDialog
          isLoading={isLoading}
          onSubmit={handleNewGame}
          onCancel={handleCancelNewGame()}
        />
      )}
    </>
  );
};

export default App;
