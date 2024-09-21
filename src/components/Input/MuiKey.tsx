import styled from "@emotion/styled";
import Button from "@mui/material/Button";

import { ThemeProps } from "@/components/Theme/types";

type OwnProps = {
  layout: "letters" | "numbers";
};

type Props = OwnProps & ThemeProps;

const color = ({
  theme: {
    palette: { mode, grey },
  },
}: Props) => (mode === "dark" ? grey[400] : grey[600]);

const backgroundColor = ({
  theme: {
    palette: { mode, grey },
  },
}: Props) => (mode === "dark" ? grey[900] : grey[100]);

export const Key = styled(Button)<OwnProps>`
  margin: 2px;
  padding: 5px 0;
  min-width: unset;
  flex-basis: ${({ layout }) => (layout === "letters" ? "9%" : "33%")};
  font-size: 1.125rem;
  color: ${color};
  border-color: ${color};

  &:hover {
    border: 1px ${color} solid;
    background-color: ${backgroundColor};
  }
`;

const mutedColor = ({ theme }: Props) => {
  const weight = theme.palette.mode === "dark" ? 600 : 500;
  return theme.palette.grey[weight];
};

export const MutedKey = styled(Key)`
  color: ${mutedColor};
  border-color: transparent;

  &:hover {
    border-color: transparent;
  }
`;

export const ActionKey = styled(Key)`
  padding: 0;
  font-size: 1.25rem;
  flex-grow: 1;
  border-color: transparent;

  &:hover {
    border-color: transparent;
  }
`;
