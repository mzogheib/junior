import React from "react";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

type Props = {
  error: string;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <Wrapper>
      <Alert severity="error">{error}</Alert>
    </Wrapper>
  );
};

export default ErrorMessage;
