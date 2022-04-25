import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";

import ThemeToggle from "./Theme/ThemeToggle";
import AuthToggle from "./Auth/AuthToggle";
import UserWelcome from "./UserWelcome";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  max-width: 230px;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerMenu = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth0();
  const firstName = user?.given_name || "Willy";

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      {firstName && (
        <Wrapper>
          <UserWelcome firstName={firstName} />
        </Wrapper>
      )}
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
      <Divider />
      <Wrapper>
        <AuthToggle />
      </Wrapper>
    </Drawer>
  );
};

export default DrawerMenu;
