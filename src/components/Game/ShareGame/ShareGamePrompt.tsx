import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { TargetSegments } from "services/segments";
import { GameSettings, GameStats } from "components/Game/types";
import { makeSharedGameUrl } from "components/Game/ShareGame/utils";
import { useState } from "react";

type Props = {
  settings: GameSettings;
  targetSegments: TargetSegments;
  stats: GameStats;
};

const ShareGamePrompt = (props: Props) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const closeSnackbar = () => setIsSnackbarOpen(false);

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const url = makeSharedGameUrl(props);

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <Button
        aria-label="share game"
        fullWidth
        onClick={handleClick}
        variant="text"
      >
        share game
      </Button>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        message="Link copied to clipboard"
        action={action}
        onClose={closeSnackbar}
      />
    </>
  );
};

export default ShareGamePrompt;
