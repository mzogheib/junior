import React from 'react';
import MuiModal, { ModalProps } from '@mui/material/Modal';
import styled from '@emotion/styled';

const StyledMuiModal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalChildren = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  outline: 0;
  border: ${({ theme }) => theme.palette.mode === 'dark' && '2px gray solid'};
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const Modal = ({ children, ...rest }: ModalProps) => (
  <StyledMuiModal {...rest}>
    <ModalChildren>{children}</ModalChildren>
  </StyledMuiModal>
);

Modal.Content = ModalContent;
Modal.Buttons = ModalButtons;

export default Modal;
