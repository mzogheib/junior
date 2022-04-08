import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from './Modal';

const Content = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const makeMessage = (numAttempts: number) => {
  if (numAttempts === 1) {
    return 'Solved in 1 attempt';
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
  <Modal open={isOpen}>
    <Modal.Content>
      <Typography variant="h4" color="primary.main" align="center">
        🥳
      </Typography>
      <Content variant="body1" color="primary.main">
        {makeMessage(numAttempts)}
      </Content>
      <Modal.Buttons>
        <Button disabled={isLoading} onClick={onAccept} variant="contained">
          New game
        </Button>
      </Modal.Buttons>
    </Modal.Content>
  </Modal>
);

export default ResultModal;
