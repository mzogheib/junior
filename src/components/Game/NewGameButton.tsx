import { Button, ButtonGroup } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNewGame } from "./NewGameProvider";
import { GameSettings } from "./types";

const NewGameButton = () => {
  const { gameSettings, setIsNewGameDialogOpen, onNewGame } = useNewGame();

  const handleSubmitNewGame = (
    newGameSettings: GameSettings,
    shouldSaveSettings: boolean
  ) => {
    onNewGame(newGameSettings, shouldSaveSettings);

    setIsNewGameDialogOpen(false);
  };

  const handleClick = (isCustom?: boolean) => () => {
    if (gameSettings && !isCustom) {
      handleSubmitNewGame(gameSettings, true);
    } else {
      setIsNewGameDialogOpen(true);
    }
  };

  return (
    <ButtonGroup variant="outlined" fullWidth aria-label="new game buttons">
      <Button onClick={handleClick()} aria-label="new game" fullWidth>
        new game
      </Button>
      {!!gameSettings && (
        <Button
          onClick={handleClick(true)}
          color="primary"
          fullWidth={false}
          aria-label="customise game"
        >
          <SettingsIcon />
        </Button>
      )}
    </ButtonGroup>
  );
};

export default NewGameButton;
