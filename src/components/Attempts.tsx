import styled from "@emotion/styled";
import Attempt from "./Attempt";
import { TileSize } from "./Tile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;
`;

type Props = {
  target: string;
  attempts: string[];
  size?: TileSize;
  readOnlyValues?: string[];
};

const Attempts = ({ target, attempts, size, readOnlyValues }: Props) => (
  <Wrapper>
    {attempts.map((attempt, i) => (
      <Attempt
        key={`${attempt}-${i}`}
        attempt={attempt}
        target={target}
        size={size}
        readOnlyValues={readOnlyValues}
      />
    ))}
  </Wrapper>
);

export default Attempts;
