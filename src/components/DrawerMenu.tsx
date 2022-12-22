import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";

import ThemeToggle from "components/Theme/ThemeToggle";
import { spacing } from "components/Theme/utils";
import UserWelcome from "components/UserWelcome";
import NewGameButton from "components/Game/NewGame/NewGameButton";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  padding: ${spacing(2)};
  max-width: 230px;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickNewGame: () => void;
};

const DrawerMenu = ({ isOpen, onClose, onClickNewGame }: Props) => {
  const { user } = useAuth0();
  const firstName = user?.given_name;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Wrapper>
        <div>
          <ItemWrapper>
            <UserWelcome firstName={firstName} />
          </ItemWrapper>
          <Divider />
        </div>
        <div>
          <ItemWrapper>
            <ThemeToggle />
          </ItemWrapper>
          <Divider />
          <ItemWrapper>
            <NewGameButton onClick={onClickNewGame} />
          </ItemWrapper>
        </div>
      </Wrapper>
    </Drawer>
  );
};

export default DrawerMenu;
