import styled from "@emotion/styled";

import BaseTile from "@/components/Tiles/BaseTile";
import { ThemeProps } from "@/components/Theme/types";

type OwnProps = {
  isFocussed?: boolean;
};

type Props = ThemeProps & OwnProps;

const borderWidth = ({ isFocussed }: Props) => (isFocussed ? "3px" : "1px");

const color = ({
  theme: {
    palette: { mode, common },
  },
}: Props) => (mode === "light" ? common.black : common.white);

const InputTile = styled(BaseTile)<OwnProps>`
  color: ${color};
  border: ${borderWidth} ${color} solid;
`;

export default InputTile;
