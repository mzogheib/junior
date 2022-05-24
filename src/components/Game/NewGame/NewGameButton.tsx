import Button, { ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNewGame } from "./NewGameProvider";

type Props = {
  onClick?: () => void;
  variant?: ButtonProps["variant"];
};

const NewGameButton = ({ onClick, variant }: Props) => {
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
      <Button
        aria-label="new game"
        fullWidth
        onClick={handleClick()}
        variant={variant}
      >
        new game
      </Button>
      {hasSavedGameSettings && (
        <Button
          aria-label="customise game"
          color="primary"
          fullWidth={false}
          onClick={handleClick(true)}
          variant={variant}
        >
          <SettingsIcon />
        </Button>
      )}
    </ButtonGroup>
  );
};

export default NewGameButton;
