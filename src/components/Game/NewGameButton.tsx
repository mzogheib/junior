import { Button, ButtonGroup } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  hasSavedGameSettings?: boolean;
  onNewGame(isCustom?: boolean): void;
};

const NewGameButton = ({ hasSavedGameSettings, onNewGame }: Props) => {
  const handleNewGame = (isCustom?: boolean) => () => onNewGame(isCustom);

  return (
    <ButtonGroup variant="outlined" fullWidth aria-label="new game buttons">
      <Button onClick={handleNewGame()} aria-label="new game" fullWidth>
        new game
      </Button>
      {hasSavedGameSettings && (
        <Button
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
