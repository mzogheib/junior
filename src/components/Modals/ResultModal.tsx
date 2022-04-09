import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Content = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const makeMessage = (numAttempts: number) => {
  if (numAttempts === 1) {
    return "Solved in 1 attempt";
  }

  return `Solved in ${numAttempts} attempts`;
};

type Props = {
  isOpen: boolean;
  isLoading?: boolean;
  numAttempts: number;
  onAccept(): void;
};

const ResultModal = ({ isOpen, isLoading, numAttempts, onAccept }: Props) => (
  <Dialog open={isOpen}>
    <DialogContent>
      <Typography variant="h4" color="primary.main" align="center">
        🥳
      </Typography>
      <Content variant="body1" color="primary.main">
        {makeMessage(numAttempts)}
      </Content>
    </DialogContent>
    <DialogActions>
      <Button disabled={isLoading} onClick={onAccept}>
        New game
      </Button>
    </DialogActions>
  </Dialog>
);

export default ResultModal;
