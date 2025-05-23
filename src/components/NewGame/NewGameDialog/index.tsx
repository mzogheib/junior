import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { GameDifficulty, GameMode, WordLength } from "components/Game/types";
import { useCreateNewGame } from "components/NewGame/utils";
import ModeSettings from "components/NewGame/NewGameDialog/ModeSettings";
import LettersSettings from "components/NewGame/NewGameDialog/LettersSettings";
import NumbersSettings from "components/NewGame/NewGameDialog/NumbersSettings";
import { ChangeHandler } from "components/NewGame/NewGameDialog/types";
import { paths } from "pages/PageRouter";

// Maybe trying to be a little too clever...
const handleChange =
  <V,>(setValue: Dispatch<SetStateAction<V>>): ChangeHandler<V> =>
  (_, value) => {
    if (value) setValue(value);
  };

const NewGameDialog = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState(GameMode.Numbers);
  const [targetLength, setTargetLength] = useState(WordLength.Five);
  const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
  const [shouldShowTimer, setShouldShowTimer] = useState(true);
  const [shouldSaveSettings, setShouldSaveSettings] = useState(false);

  const createNewGame = useCreateNewGame();

  const handleSubmit = () => {
    createNewGame(
      { mode, targetLength, difficulty, isTimerVisible: shouldShowTimer },
      shouldSaveSettings
    );
    navigate(paths.game);
  };

  const handleChangeMode = handleChange(setMode);
  const handleChangeTargetLength = handleChange(setTargetLength);
  const handleChangeDifficulty = handleChange(setDifficulty);
  const handleChangeSaveSettings = (event: ChangeEvent<HTMLInputElement>) => {
    setShouldSaveSettings(event.target.checked);
  };
  const handleChangeShowTimer = (event: ChangeEvent<HTMLInputElement>) => {
    setShouldShowTimer(event.target.checked);
  };

  return (
    <Dialog open={true}>
      <DialogTitle>New Game</DialogTitle>

      <DialogContent>
        <ModeSettings value={mode} onChange={handleChangeMode} />

        {mode === GameMode.Letters && (
          <LettersSettings
            value={targetLength}
            onChange={handleChangeTargetLength}
          />
        )}

        {mode === GameMode.Numbers && (
          <NumbersSettings
            value={difficulty}
            onChange={handleChangeDifficulty}
          />
        )}

        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={shouldShowTimer}
              onChange={handleChangeShowTimer}
            />
          }
          label="Show timer"
        />

        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={shouldSaveSettings}
              onChange={handleChangeSaveSettings}
            />
          }
          label="Save settings"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit}>Go</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
