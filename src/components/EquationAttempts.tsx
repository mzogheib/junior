import {
  Equation,
  mapOperatorCharacter,
  READ_ONLY_CHARACTERS,
  stringifyEquation,
} from "../services/equation";
import Attempts from "./Attempts";
import { TileSize } from "./Tile";

type Props = {
  target: Equation;
  attempts: Equation[];
};

const EquationAttempts = (props: Props) => {
  const target = stringifyEquation(props.target);
  const attempts = props.attempts.map((a) =>
    stringifyEquation(a).split("").map(mapOperatorCharacter).join("")
  );

  return (
    <Attempts
      target={target}
      attempts={attempts}
      size={TileSize.Small}
      readOnlyValues={READ_ONLY_CHARACTERS}
    />
  );
};

export default EquationAttempts;
