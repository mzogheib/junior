import { Button, ButtonGroup } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNewGame } from "./NewGameProvider";
import { GameSettings } from "./types";

type Props = {
  onClick?: () => void;
};

const NewGameButton = ({ onClick }: Props) => {
  const { gameSettings, setIsNewGameDialogOpen, onNewGame } = useNewGame();

  const handleSubmitNewGame = (
    newGameSettings: GameSettings,
    shouldSaveSettings: boolean
  ) => {
    onNewGame(newGameSettings, shouldSaveSettings);

    setIsNewGameDialogOpen(false);
  };

  const handleClick = (isCustom?: boolean) => () => {
    onClick?.();

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
