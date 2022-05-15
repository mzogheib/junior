import { Button, ButtonGroup } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  isLoading?: boolean;
  hasSavedGameSettings?: boolean;
  onNewGame(isCustom?: boolean): void;
};

const NewGameButton = ({
  isLoading,
  hasSavedGameSettings,
  onNewGame,
}: Props) => {
  const handleNewGame = (isCustom?: boolean) => () => onNewGame(isCustom);

  return (
    <ButtonGroup variant="outlined" fullWidth aria-label="new game buttons">
      <Button
        disabled={isLoading}
        onClick={handleNewGame()}
        aria-label="new game"
        fullWidth
      >
        new game
      </Button>
      {hasSavedGameSettings && (
        <Button
          disabled={isLoading}
          onClick={handleNewGame(true)}
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
