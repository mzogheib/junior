import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNewGame } from "./NewGameProvider";

type Props = {
  onClick?: () => void;
};

const NewGameButton = ({ onClick }: Props) => {
  const { gameSettings, setIsNewGameDialogOpen, onNewGame } = useNewGame();

  const hasSavedGameSettings = !!gameSettings;

  const handleClick = (isCustom?: boolean) => () => {
    onClick?.();

    if (isCustom || !hasSavedGameSettings) {
      setIsNewGameDialogOpen(true);
      return;
    }

    onNewGame(gameSettings, true);
  };

  return (
    <ButtonGroup variant="outlined" fullWidth aria-label="new game buttons">
      <Button onClick={handleClick()} aria-label="new game" fullWidth>
        new game
      </Button>
      {hasSavedGameSettings && (
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
