import React, { ReactNode } from "react";
import MuiModal, { ModalProps } from "@mui/material/Modal";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const StyledMuiModal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalChildren = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  outline: 0;
  border: ${({ theme }) => theme.palette.mode === "dark" && "2px gray solid"};
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

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(-1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const IconWrapper = styled.div`
  margin-inline-end: -12px;
`;

const ModalHeader = ({
  children,
  onClose,
}: {
  children?: ReactNode;
  onClose?: () => void;
}) => (
  <ModalHeaderWrapper>
    <Typography variant="h6" color="primary.main">
      {children}
    </Typography>

    {onClose && (
      <IconWrapper>
        <IconButton onClick={onClose} color="primary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </IconWrapper>
    )}
  </ModalHeaderWrapper>
);

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Buttons = ModalButtons;

export default Modal;
