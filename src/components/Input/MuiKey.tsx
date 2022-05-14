import styled from "@emotion/styled";
import Button from "@mui/material/Button";

import { ThemeProps } from "../Theme/types";

type OwnProps = {
  layout: "letters" | "numbers";
};

type Props = OwnProps & ThemeProps;

export const Key = styled(Button)<OwnProps>`
  margin: 2px;
  padding: 5px 0;
  min-width: unset;
  flex-basis: ${({ layout }) => (layout === "letters" ? "9%" : "33%")};
  font-size: 1.125rem;
`;

const mutedKeyColor = ({ theme }: Props) => {
  const weight = theme.palette.mode === "dark" ? 800 : 500;
  return theme.palette.grey[weight];
};

export const MutedKey = styled(Key)`
  color: ${mutedKeyColor};
  border-color: transparent;

  &:hover {
    border-color: transparent;
  }
`;

export const ActionKey = styled(Key)`
  padding: 0;
  font-size: 1.25rem;
  flex-grow: 1;
`;
