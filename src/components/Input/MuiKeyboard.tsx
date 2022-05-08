import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/BackspaceOutlined";
import ReturnIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { ReactNode } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -2px;
`;

const Row = styled.div<{ layout: "letters" | "numbers" }>`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Key = styled(Button)<{ layout: "letters" | "numbers" }>`
  margin: 2px;
  padding: 5px 0;
  min-width: unset;
  flex-basis: ${({ layout }) => (layout === "letters" ? "9%" : "33%")};
  font-size: 1.125rem;
`;

const ActionKey = styled(Key)`
  padding: 0;
  font-size: 1.25rem;
  flex-grow: 1;
`;

const layouts = {
  numbers: ["1 2 3", "4 5 6", "7 8 9", "{enter} 0 {bksp}"],
  letters: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{enter} Z X C V B N M {bksp}",
  ],
};

const keyDisplayMap: Record<string, ReactNode> = {
  "{bksp}": <BackspaceIcon />,
  "{enter}": <ReturnIcon />,
};

const isActionKey = (key: string) => ["{bksp}", "{enter}"].includes(key);

type Props = {
  layout: "letters" | "numbers";
  onKeyPress: (key: string) => void;
};

const MUIKeyboard = ({ layout, onKeyPress }: Props) => {
  const renderKey = (key: string) => {
    const commonProps = {
      key,
      layout,
      onClick: () => onKeyPress(key),
    };

    if (isActionKey(key)) {
      return (
        <ActionKey {...commonProps}>{keyDisplayMap[key] ?? key}</ActionKey>
      );
    }

    return (
      <Key {...commonProps} variant="outlined">
        {key}
      </Key>
    );
  };

  const renderRow = (rowOfKeys: string) => (
    <Row layout={layout}>{rowOfKeys.split(" ").map(renderKey)}</Row>
  );

  const renderRows = (rowsOfKeys: string[]) => rowsOfKeys.map(renderRow);

  return <Wrapper>{renderRows(layouts[layout])}</Wrapper>;
};

export default MUIKeyboard;
