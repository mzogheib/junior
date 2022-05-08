import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div<{ layout: "letters" | "numbers" }>`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    margin: 2px;
    padding: 5px 0;
    min-width: unset;
    flex-basis: ${({ layout }) => (layout === "letters" ? "10%" : "33%")};
  }
`;

const layouts = {
  numbers: ["1 2 3", "4 5 6", "7 8 9", "{enter} 0 {bksp}"],
  letters: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{enter} Z X C V B N M {bksp}",
  ],
};

const keyDisplayMap: Record<string, string> = {
  "{bksp}": "⌫",
  "{enter}": "↵",
};

type Props = {
  layout: "letters" | "numbers";
  onKeyPress: (key: string) => void;
};

const MUIKeyboard = ({ layout, onKeyPress }: Props) => {
  const renderRow = (rowOfKeys: string) => (
    <Row layout={layout}>
      {rowOfKeys.split(" ").map((key) => (
        <Button onClick={() => onKeyPress(key)} variant="outlined" fullWidth>
          {keyDisplayMap[key] ?? key}
        </Button>
      ))}
    </Row>
  );

  const renderRows = (rowsOfKeys: string[]) => rowsOfKeys.map(renderRow);

  return <Wrapper>{renderRows(layouts[layout])}</Wrapper>;
};

export default MUIKeyboard;
