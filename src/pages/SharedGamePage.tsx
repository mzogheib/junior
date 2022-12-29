import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { useSharedGame } from "components/Game/ShareGame/utils";
import { useNewGame } from "components/Game/NewGame/NewGameProvider";
import PageWrapper from "pages/PageWrapper";
import { paths } from "pages/PageRouter";

const SharedGamePage = () => {
  const navigate = useNavigate();

  const initialConfig = useSharedGame();
  const { setGameConfig } = useNewGame();

  const handleClick = () => {
    if (!initialConfig) return;

    setGameConfig(initialConfig);
    navigate(paths.game);
  };

  return (
    <PageWrapper>
      <div>{initialConfig && JSON.stringify(initialConfig)}</div>
      <Button variant="contained" onClick={handleClick}>
        Go
      </Button>
    </PageWrapper>
  );
};

export default SharedGamePage;
