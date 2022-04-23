import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import Tile from "./Tile";

const getBorderColor = (isFocussed: boolean, theme: Theme) => {
  const focussedConfig = {
    light: "black",
    dark: "white",
  };

  return isFocussed ? focussedConfig[theme.palette.mode] : "gray";
};

type Props = {
  isFocussed: boolean;
};

const InputTile = styled(Tile)<Props>`
  border: ${({ isFocussed }) => (isFocussed ? "2px" : "1px")}
    ${({ isFocussed, theme }) => getBorderColor(isFocussed, theme)} solid;
  color: ${({ theme }) => (theme.palette.mode === "light" ? "black" : "white")};
`;

export default InputTile;
