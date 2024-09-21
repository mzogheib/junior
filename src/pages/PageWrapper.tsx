import { ReactNode } from "react";
import styled from "@emotion/styled";

import AppHeader from "@/components/AppHeader";
import { spacing } from "@/components/Theme/utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const Main = styled.main`
  flex-grow: 1;
  display: grid;
  grid-template-rows: 1fr;
`;

const Inner = styled.div`
  padding: ${spacing(2)};
  display: flex;
  flex-direction: column;
  align-items: center;
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

PageWrapper.Inner = Inner;

export default PageWrapper;
