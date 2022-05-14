import { ReactNode } from "react";
import styled from "@emotion/styled";
import BackspaceIcon from "@mui/icons-material/BackspaceOutlined";
import ReturnIcon from "@mui/icons-material/KeyboardReturnOutlined";

import { ActionKey, Key, MutedKey } from "./MuiKey";

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
  mutedKeys?: string[];
  onKeyPress: (key: string) => void;
};

const MUIKeyboard = ({ layout, mutedKeys, onKeyPress }: Props) => {
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

    const isMuted = mutedKeys?.includes(key);
    const KeyComp = isMuted ? MutedKey : Key;
    const variant = isMuted ? "text" : "outlined";

    return (
      <KeyComp {...commonProps} variant={variant}>
        {key}
      </KeyComp>
    );
  };

  const renderRow = (rowOfKeys: string) => (
    <Row layout={layout}>{rowOfKeys.split(" ").map(renderKey)}</Row>
  );

  const renderRows = (rowsOfKeys: string[]) => rowsOfKeys.map(renderRow);

  return <Wrapper>{renderRows(layouts[layout])}</Wrapper>;
};

export default MUIKeyboard;
