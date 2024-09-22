import styled from "@emotion/styled";

import { ThemeProps } from "components/Theme/types";
import { getIntermediateHex } from "misc/utils";

/**
 * https://chat.openai.com/c/ffd03d73-c824-4b99-bead-c5b81fc4762a
 */

const fontFamily = ({ theme }: ThemeProps) => theme.typography.fontFamily;

const maxTime = 120 * 1000; // milliseconds

const initialColor = ({
  theme: {
    palette: { mode, grey },
  },
}: ThemeProps) => (mode === "dark" ? grey[400] : grey[600]);

const color = (props: Props & ThemeProps) =>
  getIntermediateHex(
    initialColor(props),
    props.theme.palette.error.main,
    props.time / maxTime
  );

const Wrapper = styled.div<Props>`
  font-family: ${fontFamily};
  font-size: 18px;
  color: ${color};
  padding: 5px 10px;
  border: 1px solid ${color};
  border-radius: 4px;
`;

type Props = {
  time: number; // milliseconds
};

const Stopwatch = ({ time }: Props) => {
  const milliseconds = Math.floor(time % 100)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <Wrapper time={time}>
      {minutes}:{seconds}.{milliseconds}
    </Wrapper>
  );
};

export default Stopwatch;
