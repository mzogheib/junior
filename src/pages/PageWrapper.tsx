import { ReactNode } from "react";
import styled from "@emotion/styled";

import AppHeader from "components/AppHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  flex-grow: 1;
`;

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => (
  <Wrapper>
    <AppHeader />
    <Main>{children}</Main>
  </Wrapper>
);

export default PageWrapper;
