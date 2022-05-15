import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";

import ThemeToggle from "./Theme/ThemeToggle";
import AuthToggle from "./Auth/AuthToggle";
import UserWelcome from "./UserWelcome";
import { spacing } from "./Theme/utils";
import NewGameButton from "./Game/NewGameButton";

const Wrapper = styled.div`
  padding: ${spacing(2)};
  max-width: 230px;
`;

const Item = styled.div`
  margin-top: ${spacing(1)};
`;

type Props = {
  isOpen: boolean;
  isLoading?: boolean;
  hasSavedGameSettings?: boolean;
  onNewGame(isCustom?: boolean): void;
  onClose: () => void;
};

const DrawerMenu = ({
  isOpen,
  isLoading,
  hasSavedGameSettings,
  onNewGame,
  onClose,
}: Props) => {
  const { user } = useAuth0();
  const firstName = user?.given_name;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Wrapper>
        <UserWelcome firstName={firstName} />
        <Item>
          <AuthToggle />
        </Item>
      </Wrapper>
      <Divider />
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
      <Divider />
      <Wrapper>
        <NewGameButton
          isLoading={isLoading}
          hasSavedGameSettings={hasSavedGameSettings}
          onNewGame={onNewGame}
        />
      </Wrapper>
    </Drawer>
  );
};

export default DrawerMenu;
