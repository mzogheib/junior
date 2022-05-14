import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import Button from "@mui/material/Button";

type OwnProps = {
  layout: "letters" | "numbers";
};

type ThemeProps = {
  theme: Theme;
};

type Props = OwnProps & ThemeProps;

const keyColor = ({ theme }: Props) => {
  if (theme.palette.mode === "dark") {
    return theme.palette.grey[800];
  } else {
    return theme.palette.grey[500];
  }
};

export const Key = styled(Button)<OwnProps>`
  margin: 2px;
  padding: 5px 0;
  min-width: unset;
  flex-basis: ${({ layout }) => (layout === "letters" ? "9%" : "33%")};
  font-size: 1.125rem;
`;

export const MutedKey = styled(Key)`
  color: ${keyColor};
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
