import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from './Modal';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

type Props = {
  isOpen: boolean;
  numAttempts: number;
  onAccept(): void;
};

const ResultModal = ({ isOpen, numAttempts, onAccept }: Props) => (
  <Modal open={isOpen}>
    <Wrapper>
      <Typography variant="h3" component="h3" color="primary.main">
        Success!
      </Typography>
      <Typography variant="body1" color="primary.main" component="p">
        Solved in {numAttempts} attempt(s).
      </Typography>
      <ButtonWrapper>
        <Button onClick={onAccept} variant="contained">
          New game
        </Button>
      </ButtonWrapper>
    </Wrapper>
  </Modal>
);

export default ResultModal;
