import styled from "@emotion/styled";

import AppHeader from "./components/AppHeader";
import Game from "./components/Game/Game";
import NewGameDialog from "./components/Game/NewGame/NewGameDialog";
import { useNewGame } from "./components/Game/NewGame/NewGameProvider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  flex-grow: 1;
`;

const App = () => {
  const { gameConfig } = useNewGame();

  const renderGame = () => {
    if (!gameConfig) {
      return;
    }

    // Add a key to force a re-mount when the game changes. This avoids
    // left over state from a previous game.
    return <Game key={gameConfig.startedAt} config={gameConfig} />;
  };

  return (
    <>
      <Wrapper>
        <AppHeader />
        <Main>{renderGame()}</Main>
      </Wrapper>

      <NewGameDialog />
    </>
  );
};

export default App;
