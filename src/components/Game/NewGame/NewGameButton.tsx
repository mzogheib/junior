import Button, { ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNewGame } from "components/Game/NewGame/NewGameProvider";

type Props = {
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  fullWidth?: ButtonProps["fullWidth"];
};

const NewGameButton = ({ onClick, variant, fullWidth = true }: Props) => {
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
    <ButtonGroup
      variant="outlined"
      fullWidth={fullWidth}
      aria-label="new game buttons"
    >
      <Button
        aria-label="new game"
        fullWidth={fullWidth}
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
