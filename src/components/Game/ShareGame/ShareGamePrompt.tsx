import Button from "@mui/material/Button";

import { TargetSegments } from "services/segments";
import { GameSettings } from "components/Game/types";
import { makeSharedGameUrl } from "components/Game/ShareGame/utils";

type Props = {
  settings: GameSettings;
  targetSegments: TargetSegments;
};

const ShareGamePrompt = (props: Props) => {
  const url = makeSharedGameUrl(props);

  const handleClick = () => navigator.clipboard.writeText(url);

  return (
    <Button
      aria-label="new game"
      fullWidth
      onClick={handleClick}
      variant="text"
    >
      share game
    </Button>
  );
};

export default ShareGamePrompt;
