import React from 'react';
import MuiModal, { ModalProps } from '@mui/material/Modal';
import styled from '@emotion/styled';

const StyledMuiModal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalChildren = styled.div`
  outline: 0;
`;

const Modal = ({ children, ...rest }: ModalProps) => (
  <StyledMuiModal {...rest}>
    <ModalChildren>{children}</ModalChildren>
  </StyledMuiModal>
);

export default Modal;
