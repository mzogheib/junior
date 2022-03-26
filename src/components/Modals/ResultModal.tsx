import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from './Modal';

const Content = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isOpen: boolean;
  isLoading?: boolean;
  numAttempts: number;
  onAccept(): void;
};

const ResultModal = ({ isOpen, isLoading, numAttempts, onAccept }: Props) => (
  <Modal open={isOpen}>
    <Modal.Content>
      <Typography variant="h4" color="primary.main">
        Success!
      </Typography>
      <Content variant="body1" color="primary.main">
        Solved in {numAttempts} attempt(s).
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
