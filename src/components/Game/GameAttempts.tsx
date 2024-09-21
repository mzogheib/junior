import Attempts from "@/components/Attempts";
import { Attempt } from "@/components/Game/types";
import {
  stringifyTargetSegments,
  READ_ONLY_CHARACTERS,
  CHARACTER_DISPLAY_MAP,
  TargetSegments,
} from "@/services/segments";
import { getAttemptsValues } from "@/services/utils";

type Props = {
  attempts: Attempt[];
  targetSegments: TargetSegments;
};

const GameAttempts = ({ attempts, targetSegments }: Props) => {
  if (!attempts.length) return null;

  return (
    <Attempts
      attempts={getAttemptsValues(attempts)}
      target={stringifyTargetSegments(targetSegments)}
      readOnlyValues={READ_ONLY_CHARACTERS}
      characterMap={CHARACTER_DISPLAY_MAP}
    />
  );
};

export default GameAttempts;
