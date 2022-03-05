import React from 'react';
import MuiModal, { ModalProps } from '@mui/material/Modal';
import styled from '@emotion/styled';

const StyledMuiModal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ children, ...rest }: ModalProps) => {
  return <StyledMuiModal {...rest}>{children}</StyledMuiModal>;
};

export default Modal;
