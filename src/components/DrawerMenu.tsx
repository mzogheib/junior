import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";

import ThemeToggle from "@/components/Theme/ThemeToggle";
import { spacing } from "@/components/Theme/utils";
import UserWelcome from "@/components/UserWelcome";
import NewGameButton from "@/components/NewGame/NewGameButton";
import BuildNumber from "@/components/BuildNumber";

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
};

const DrawerMenu = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Wrapper>
        <div>
          <ItemWrapper>
            <UserWelcome />
          </ItemWrapper>
          <Divider />
          <ItemWrapper>
            <NewGameButton onClick={onClose} />
          </ItemWrapper>
        </div>
        <div>
          <ItemWrapper>
            <ThemeToggle />
          </ItemWrapper>
          <ItemWrapper>
            <BuildNumber />
          </ItemWrapper>
        </div>
      </Wrapper>
    </Drawer>
  );
};

export default DrawerMenu;
