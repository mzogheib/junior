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

const Content = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: () => void;
};

const NewGameModal = ({ isOpen, isLoading, onSubmit }: Props) => {
  return (
    <Modal open={isOpen}>
      <Wrapper>
        <Content variant="body1" color="primary.main">
          Choose a game type.
        </Content>
        <ButtonWrapper>
          <Button disabled={isLoading} onClick={onSubmit} variant="contained">
            Go!
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

export default NewGameModal;
