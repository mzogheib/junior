import styled from "@emotion/styled";

import { ThemeProps } from "../Theme/types";
import { TileVariant } from "./types";

type OwnProps = {
  variant?: TileVariant;
};

type Props = OwnProps & ThemeProps;

const width = ({ variant }: Props) => {
  if (variant === TileVariant.ReadOnly) {
    return 20;
  }

  return 40;
};

const borderRadius = ({ theme }: Props) => theme.shape.borderRadius;
const fontFamily = ({ theme }: Props) => theme.typography.fontFamily;

const color = ({
  theme: {
    palette: { mode, grey, common },
  },
  variant,
}: Props) => {
  if (variant === TileVariant.ReadOnly) {
    return mode === "dark" ? common.white : common.black;
  }

  return common.black;
};

const BaseTile = styled.div<OwnProps>`
  max-width: ${width}px;
  height: 40px;
  width: 100%;
  border: none;
  border-radius: ${borderRadius}px;
  margin: 0 2px;

  color: ${color};

  font-size: 22px;
  font-family: ${fontFamily};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default BaseTile;
