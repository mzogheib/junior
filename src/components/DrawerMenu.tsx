import Drawer from "@mui/material/Drawer";
import styled from "@emotion/styled";

import ThemeToggle from "./Theme/ThemeToggle";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerMenu = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
    </Drawer>
  );
};

export default DrawerMenu;
