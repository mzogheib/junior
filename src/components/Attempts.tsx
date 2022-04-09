import styled from "@emotion/styled";
import Attempt from "./Attempt";
import { TileSize } from "./Tile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AttempWrapper = styled.div`
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
      <AttempWrapper key={`${attempt}-${i}`}>
        <Attempt
          attempt={attempt}
          target={target}
          size={size}
          readOnlyValues={readOnlyValues}
        />
      </AttempWrapper>
    ))}
  </Wrapper>
);

export default Attempts;
